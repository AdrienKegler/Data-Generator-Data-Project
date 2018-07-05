const oracle = require("oracledb");

const USER = "C##PROJETDATA";
const PASSWORD = "Oracle123";
const CONNECTION = "192.168.56.11/orcl";

let currentConnection = null;

async function requireConnection() {
    if (!currentConnection) {
        await connect();
    }
}

async function connect() {
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

async function disconnect() {
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

async function execute(query, ...values) {
    if(typeof values[0] === typeof []){
        values = values[0];
    }
    console.log(query);
    return new Promise((resolve, reject) => {
        try {
            requireConnection();
            return currentConnection.execute(query, values, {}, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            })
        } catch (e) {
            return reject(e);
        }

    })
}

async function getRandomFromTable(table, count) {
    count = count + 1 || 2;
    return await execute("SELECT * FROM (SELECT * FROM " + table + " ORDER BY DBMS_RANDOM.VALUE) WHERE rownum<:num", count);
}

async function mapQuery(query, ...values) {
    let result = await execute(query, ...values);
    let columns = result.metaData.map((el) => el.name.toLowerCase());
    return result.rows.map((el) => {
        return el.reduce((acc, elem, i) => {
            acc[columns[i]] = elem;
            return acc
        }, {})
    })
}

module.exports = {
    mapQuery,
    connect,
    disconnect,
    execute,
    commit,
    rollback,
    getRandomFromTable
};