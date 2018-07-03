const ColorList = require('./ColorList');
const TableInterface = require('./TableInterface');


console.log(TableInterface.fetchWholeTable('ColorList'));

TableInterface.updateRow(new ColorList('blue', 11));

console.log(TableInterface.fetchWholeTable('ColorList'));
