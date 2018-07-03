const TransportType = require ('./TransportType');
const Packaging = require ('./Packaging');
const ManufacturingMachineConfig = require ('./ManufacturingMachineConfig');
const Country = require ('./Country');
const PackagingMachine = require ('./PackagingMachine');
const Employee = require ('./Employee');
const ManufacturingMachine = require ('./ManufacturingMachine');
const TasteList = require ('./TasteList');
const TextureList = require ('./TextureList');
const CandyList = require ('./CandyList');
const ColorList = require('./ColorList');
const TableInterface = require('./TableInterface');
// importer CandyList (puis les autres)

class PreFilling {

    constructor(){}


    static run(){
        this.fillColorList();
    }

    static fillColorList(){
        let colors =    [
                            'Rouge',
                            'Orange',
                            'Jaune',
                            'Vert',
                            'Bleu',
                            'Violet',
                            'Noir',
                            'Marron'
                        ];

        colors.forEach(function (value) {

            TableInterface.insertRow(new ColorList(value));

        });
    }

    static fillCandyList(){
        let candies =   [
                            ['Acidofilo', 10, 10, 11, 13],
							['Bouteille cola', 15, 14, 19, 10],
							['Brazil pik', 13, 14, 15, 9],
							['Color Schtroummpf pik', 9, 16, 20 9],
							['Langues acides', 15, 8, 11, 16],
							['London pik', 16, 9, 20, 13],
							['Miami pik', 8, 8, 11, 10],
							['Pasta Basta', 12,	19,	16,	8],
							['Pasta frutta', 18, 13, 16, 13],
							['Sour snup', 11, 16, 17, 16],
							['Dragibus', 20, 9,	12,	15],
							['Carensac', 16, 12, 14, 18],
							['Fraizibus', 13, 15, 14, 11],
							['Grain de millet',	8, 15, 13, 14],
							['Starmint', 14, 9,	18,	15],
							['Florent violette', 19, 14, 20, 17],
							['Kimono', 14, 19, 12, 13],
							['Pain Zan', 12, 16, 12, 14],
							['Rotella', 11,	11,	14,	19],
							['Zanoïd', 19, 14, 8, 11],
							['Fraise tagada', 12, 8, 12, 16],
							['Croco', 12, 20, 8, 18],
							['Chamallows', 16, 11, 13, 11],
							['Polka', 11, 15, 10, 8],
							['Banane', 9, 14, 15, 14],
							['Ourson', 15, 9, 17, 20],
							['Filament', 8, 11, 11, 19],
                        ];

        candies.forEach(function (value) {
            TableInterface.insertRow(CandyList.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }

    static fillTextureList(){
        let textures =   [
                 			['Mou'],
                 			['Dur']
                        ];

        textures.forEach(function (value) {
            TableInterface.insertRow(TextureList.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
    static fillTasteList(){
        let tastes =   [
                 			['Acide'],
                 			['Sucré'],
                 			['Gélifié']
                        ];

        tastes.forEach(function (value) {
            TableInterface.insertRow(TasteList.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }    static fillManufacturingMachine(){
        let manufacturingmachine =   [
                 			['1'],
                 			['2'],
                 			['3'],
                 			['4']
                        ];

        manufacturingmachine.forEach(function (value) {
            TableInterface.insertRow(ManufacturingMachine.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillEmployee(){
        let employees =   [
                                ];

        employees.forEach(function (value) {
            TableInterface.insertRow(Employee.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillPackagingMachine(){
        let packagingmachines =   [
                 			[1 ,1]
                 			[2 ,1],
                 			[3 ,1],
                 			[4 ,2],
                 			[5 ,2],
                 			[6 ,3]
                        ];

        packagingmachines.forEach(function (value) {
            TableInterface.insertRow(Packagingmachine.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillCountry(){
        let countrys =   [
                 			['Allemagne', 'DE'],
                 			['Autriche', 'AT'],
                 			['Belgique', 'BE'],
                 			['Bulgarie', 'BG'],
                 			['Chypre', 'CY'],
                 			['Croatie', 'HR'],
                 			['Danemark', 'DK'],
                 			['Espagne', 'ES'],
                 			['Estonie', 'EE'],
                 			['Finlande', 'FI'],
                 			['France', 'FR'],
                 			['Grèce', 'GR'],
                 			['Hongrie', 'HU'],
                 			['Irelande', 'IE'],
                 			['Italie', 'IT'],
                 			['Lettonie', 'LV'],
                 			['Lituanie', 'LT'],
                 			['Luxembourg', 'LU'],
                 			['Malte', 'MT'],
                 			['Pays-Bas', 'NL'],
                 			['Pologne', 'PL'],
                 			['Portugal', 'PT'],
                 			['République tchèque', 'CZ'],
                 			['Roumanie', 'RO'],
                 			['Royaume-Uni', 'GB'],
                 			['Slovaquie', 'SK'],
                 			['Suède', 'SE'],
                 			['USA', 'US'],
                 			['Canada', 'CA'],
                 			['Mexique', 'MX'],
                 			['Japon', 'JP'],
                 			['Chine', 'CN'],
                 			['Afrique du sud', 'ZA']
                        ];

        countrys.forEach(function (value) {
            TableInterface.insertRow(Country.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillManufacturingMachineConfig(){
        let textures =   [

                        ];

        textures.forEach(function (value) {
            TableInterface.insertRow(ManufacturingMachineConfig.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillPackaging(){
        let packagings =   [
                 			['Sachet'],
                 			['Boite'],
                 			['Echantillon']
                        ];

        packagings.forEach(function (value) {
            TableInterface.insertRow(Packaging.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }
        static fillTransportType(){
        let transports =   [
                 			['Camion'],
                 			['Avion'],
                 			['Bateau']
                        ];

        transports.forEach(function (value) {
            TableInterface.insertRow(TransportType.apply(value)); // split les éléments de l'array en tant qu'arguments du constructeur de l'objet CandyList
        });
    }

}

module.exports = PreFilling;