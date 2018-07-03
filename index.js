const ColorList = require('./ColorList');
const TableInterface = require('./TableInterface');
const 




let tmp = TableInterface.fetchWholeTable('ColorList');

tmp.then(function (result) {
   console.log(result);
});