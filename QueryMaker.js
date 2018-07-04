const fs = require('fs');


class QueryMaker {

    constructor() {
        this.arrayDataSet = []
    };


    static fetchWholeTable(tableName) {
        let query =  "SELECT * FROM " + tableName;

        QueryMaker.addToFile(query);

        return query;
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

        QueryMaker.addToFile(query);

        return query;
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

        QueryMaker.addToFile(query);

        return query;
    }


    static addToFile(string){
        fs.appendFile('dynamic.sql', string, function (err) {
            if (err) throw err;
        });
    }

}

module.exports = QueryMaker;
