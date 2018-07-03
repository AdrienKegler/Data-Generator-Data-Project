const connectionString = {
    user          : "C##PROJETDATA",
    password      : "Oracle123",
    connectString : "192.168.56.11/orcl"
};

var oracledb = require('oracledb');


class TableInterface{

    constructor(){};

    fetchWholeTable(tableName){
        oracledb.getConnection(
            connectionString,
            function(err, connection) {
                connection.execute(
                    "SELECT * FROM " + tableName,
                    [],
                    {resultSet: true},
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        this.fetchOneRowFromRS(connection, result.resultSet);
                    }
                )
        });
    }

    insertRow(row){

        let query = `INSERT INTO ` + row.constructor.name + ' (';

        for(let propertyName in row){
            query = query + propertyName + ', ';
        }

        query = query.slice(0, - 2) + ") VALUES (";


        for(let index in row) {
            let attr = row[index];
            switch(typeof attr){
                case 'number':
                    query = query + attr + ", ";
                    break;
                case 'string':
                    query = query + "'" + attr + "', ";
                    break;
                case 'undefined':
                    query = query + "'', ";
                    break;
                default:
                    query = query + "'" + attr + "', ";
                    break;
            }
        }

        query = query.slice(0, - 2) + ")";

        console.log(query);

        oracledb.getConnection(
            connectionString,
            function(err, connection) {
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


    fetchOneRowFromRS(connection, resultSet) {
        resultSet.getRow( // get one row
        function (err, row) {
            if (err) {
            // close the Result Set and release the connection
            } else if (!row) { // no rows, or no more rows
            // close the Result Set and release the connection
            } else {
                console.log(row);
                this.fetchOneRowFromRS(connection, resultSet);  // get next row
            }
        });
    }

};

module.exports = TableInterface;
