const db = require('./db');
const ColorList = require('./ColorList');
const QueryMaker = require('./QueryMaker');
const PreFilling = require('./PreFilling');


var fakeDataSet = {tableName : "", dataSet: Object()};

(async () => {

    await connect();

    // QueryMaker.fetchWholeTable('ColorList');

    console.log( await execute("SELECT * FROM ColorList"));

})();

