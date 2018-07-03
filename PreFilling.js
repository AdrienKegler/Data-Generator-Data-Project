const ColorList = require('./ColorList');
const TableInterface = require('./TableInterface');
// importer CandyList (puis les autres)

class PreFilling {

    constructor(){}


    static run(){
        this.FillColorList();
    }

    FillColorList(){
        let colors =    [
                            'blue',
                            'red'
                        ];

        colors.forEach(function (value) {

            TableInterface.insertRow(new ColorList(value));

        });
    }

    CandyList(){
        let candies =   [
                            ['chuppachups', 16.2, 9.4, 8.6, 11.3],
                            ['dragibus', 10.2, 9.5, 8.7, 18.3],
                            ['tagada', 14.2, 9.4, 8.9, 14.3]
                        ];

        candies.forEach(function (value) {
            TableInterface.insertRow(CandyList.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }



}

module.exports = PreFilling;