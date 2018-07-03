const connectionString = {
    user: "C##PROJETDATA",
    password: "Oracle123",
    connectString: "192.168.56.11/orcl"
};

const oracledb = require('oracledb');


class TableInterface {

    constructor() {
    };


    static fetchWholeTable(tableName) {
        let arrayDataSet = null;
        let query = "SELECT * FROM " + tableName;

        oracledb.getConnection(
            connectionString,
            function (err, connection) {
                connection.execute(
                    query,
                    [], // no bind variables
                    {resultSet: true}, // return a ResultSet.  Default is false
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        TableInterface.fetchOneRowFromRS(connection, result.resultSet);
                    }
                )
            }
        );
        return arrayDataSet;
    }

    static insertRow(row) {

        let query = `INSERT INTO ` + row.constructor.name + ' (';

        for (let propertyName in row) {
            query = query + propertyName + ', ';
        }

        query = query.slice(0, -2) + ") VALUES (";


        for (let index in row) {
            let attr = row[index];
            switch (typeof attr) {
                case 'number':
                    query = query + attr + ", ";
                    break;
                case 'string':
                    query = query + "'" + attr + "', ";
                    break;
                case 'undefined':
                case 'object':
                    query = query + "'', ";
                    break;
                default:
                    query = query + "'" + attr + "', ";
                    break;
            }
        }

        query = query.slice(0, -2) + ")";

        console.log(query);

        oracledb.getConnection(
            connectionString,
            function (err, connection) {
                connection.execute(
                    query,
                    [],
                    {autoCommit: true},
                    function (err, result) {
                        console.log(result.rows);
                    });
            }
        );
    }


    static updateRow(row) {

        let query = `UPDATE ` + row.constructor.name + ' SET ';

        let idFieldName = null;

        for (let index in row) {
            if (index.substr(index.length - 2).toUpperCase() !== 'ID') {
                let attr = row[index];
                query = query + " " + index + " = '" + attr + "',";
            } else {
                idFieldName = index;
                console.log(index);
            }
        }

        query = query.slice(0, -1) + " WHERE " + idFieldName + " = " + row[idFieldName];

        console.log(query);

        oracledb.getConnection(
            connectionString,
            function (err, connection) {
                connection.execute(
                    query,
                    [],
                    {autoCommit: true},
                    function (err, result) {
                        console.log(result);
                    });
            }
        );
    }

    static fetchOneRowFromRS(connection, resultSet) {
        resultSet.getRow( // get one row
            function (err, row) {
                if (err) {
                    console.error(err.message);
                    TableInterface.doClose(connection, resultSet); // always close the ResultSet
                } else if (!row) { // no rows, or no more rows
                    TableInterface.doClose(connection, resultSet); // always close the ResultSet
                } else {
                    console.log(row);
                    TableInterface.fetchOneRowFromRS(connection, resultSet);
                }
            }
        );
    }

    static doRelease(connection) {
        connection.close(
            function (err) {
                if (err) {
                    console.error(err.message);
                }
            }
        );
    }

    static doClose(connection, resultSet) {
        resultSet.close(
            function (err) {
                if (err) {
                    console.error(err.message);
                }
                TableInterface.doRelease(connection);
            }
        );
    }

}

module.exports = TableInterface;
