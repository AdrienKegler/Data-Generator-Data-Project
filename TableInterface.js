const connectionString = {
    user: "C##PROJETDATA",
    password: "Oracle123",
    connectString: "192.168.56.11/orcl"
};

const oracledb = require('oracledb');


class TableInterface {

    constructor() {
        this.arrayDataSet = []
    };


    static fetchWholeTable(tableName) {
        this.arrayDataSet = [];
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
                            return err;
                        }
                        return TableInterface.fetchRowsFromRS(connection, result.resultSet);
                    }
                )
            }
        );
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
                    function (err, result) {}
                );
            }
        );
    }

    static fetchRowsFromRS(connection, resultSet) {
        resultSet.getRow( // get one row
            function (err, row) {
                let toReturn = [];
                if (err) {
                    console.error(err.message);
                    TableInterface.doClose(connection, resultSet); // always close the ResultSet
                    return err;
                } else if (!row) { // no rows, or no more rows
                    TableInterface.doClose(connection, resultSet); // always close the ResultSet
                    return null;
                } else {
                    return row;
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
