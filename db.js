const oracle = require("oracledb");

const USER = "C##PROJETDATA";
const PASSWORD = "Oracle123";
const CONNECTION = "192.168.56.11/orcl";

let currentConnection = null;

function requireConnection() {
    if (!currentConnection) {
        throw new Error("DB connection not initialized")
    }
}

function connect() {
    return new Promise((resolve, reject) => {
        return oracle.getConnection({
            user: USER,
            password: PASSWORD,
            connectString: CONNECTION
        }, (err, connection) => {
            if (err) {
                return reject(err);
            }
            currentConnection = connection;
            return resolve(connection);
        })
    })
}

function disconnect() {
    return new Promise((resolve, reject) => {
        currentConnection.close((err) => {
            if (err) {
                return reject(err);
            }
            currentConnection = null;
            return resolve();
        })
    })
}

async function commit() {
    await execute("COMMIT");
}

async function rollback() {
    await execute("ROLLBACK");
}

function execute(query, ...values) {
    return new Promise((resolve, reject) => {
        requireConnection();
        return currentConnection.execute(query, values, {}, (err, result) => {
            commit();
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

async function getRandomFromTable(table, count) {
    count = count + 1 || 2;
    return await execute("SELECT * FROM (SELECT * FROM " + table + " ORDER BY DBMS_RANDOM.VALUE) WHERE rownum<:num", count);
}

module.exports = {
    connect,
    disconnect,
    execute,
    commit,
    rollback,
    getRandomFromTable
};