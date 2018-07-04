const TransportType = require('./TransportType');
const Packaging = require('./Packaging');
const ManufacturingMachineConfig = require('./ManufacturingMachineConfig');
const ManufacturingMachineSetup = require('./ManufacturingMachineSetup');
const Country = require('./Country');
const PackagingMachine = require('./PackagingMachine');
const Employee = require('./Employee');
const ManufacturingMachine = require('./ManufacturingMachine');
const TasteList = require('./TasteList');
const TextureList = require('./TextureList');
const CandyList = require('./CandyList');
const ColorList = require('./ColorList');
const QueryMaker = require('./QueryMaker');
const CandyRecipe = require('./CandyRecipe');
const CandyReference = require('./CandyReference');
const CostByPackaging = require('./CostByPackaging');
const CandyCombo = require('./CandyCombo');
const ShipmentType = require('./ShipmentType');
const Ingredient = require('./Ingredient');
const db = require('./db');

class PreFilling {

    constructor() {
    }


    static async run() {
        await this.fillTasteList();
        await this.fillPackaging();
        await this.fillColorList();
        await this.fillCandyList();
        await this.fillTextureList();
        await this.fillIngredient();
        await this.fillManufacturingMachine();
        await this.fillCountry();
        await this.fillPackagingMachine();
        await this.fillTransportType();
        await this.fillManufacturingMachineConfig();
        await this.fillCostByPackaging();
        await this.fillEmployee();
        await this.fillCandyCombo();
        await this.fillManufacturingMachineSetup();
        await this.fillCandyRecipe();
        await this.fillShipmentType();
        await this.fillCandyReference();
    }

    static async fillIngredient() {
        let ingredients = [
            ["Additifs", 0, 1200, 5, 1],
            ["Enrobage", 0, 1200, 4, 2],
            ["Arôme", 0, 1200, 4, 3],
            ["Gélifiants", 0, 1000, 20, 4],
            ["Sucre", 0, 1000, 20, 5]
        ];

        ingredients.forEach(function (value) {
            let b = QueryMaker.insertRow(new Ingredient(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillCountry() {
        let countries = [
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
            ['Slovenie', 'SI'],
            ['Suède', 'SE'],
            ['USA', 'US'],
            ['Canada', 'CA'],
            ['Mexique', 'MX'],
            ['Japon', 'JP'],
            ['Chine', 'CN'],
            ['Afrique du sud', 'ZA']
        ];

        countries.forEach(function (value) {
            let b = QueryMaker.insertRow(new Country(...value));
            // db.execute(b.query, b.binds);

        });


    }

    static async fillColorList() {

        let colors = [
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
            let b = QueryMaker.insertRow(new ColorList(value));
            // db.execute(b.query, b.binds);
        });

    }

    static async fillCandyList() {

        let candies = [
            ['Acidofilo', 10, 10, 11, 13],
            ['Bouteille cola', 15, 14, 19, 10],
            ['Brazil pik', 13, 14, 15, 9],
            ['Color Schtroummpf pik', 9, 16, 20, 9],
            ['Langues acides', 15, 8, 11, 16],
            ['London pik', 16, 9, 20, 13],
            ['Miami pik', 8, 8, 11, 10],
            ['Pasta Basta', 12, 19, 16, 8],
            ['Pasta frutta', 18, 13, 16, 13],
            ['Sour snup', 11, 16, 17, 16],
            ['Dragibus', 20, 9, 12, 15],
            ['Carensac', 16, 12, 14, 18],
            ['Fraizibus', 13, 15, 14, 11],
            ['Grain de millet', 8, 15, 13, 14],
            ['Starmint', 14, 9, 18, 15],
            ['Florent violette', 19, 14, 20, 17],
            ['Kimono', 14, 19, 12, 13],
            ['Pain Zan', 12, 16, 12, 14],
            ['Rotella', 11, 11, 14, 19],
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
            let b = QueryMaker.insertRow(new CandyList(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillTextureList() {
        let textures = [
            ["Mou", 1],
            ["Dur", 2]
        ];

        textures.forEach(function (value) {
            let b = QueryMaker.insertRow(new TextureList(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillTasteList() {
        let tastes = [
            ['Acide', 1],
            ['Sucré', 2],
            ['Gélifié', 3]
        ];

        tastes.forEach(function (value) {
            let b = QueryMaker.insertRow(new TasteList(...value));
            // db.execute(b.query, b.binds);
        });

    }

    static async fillManufacturingMachine() {
        let manufacturingmachine = [
            ['1'],
            ['2'],
            ['3'],
            ['4']
        ];

        manufacturingmachine.forEach(function (value) {
            let b = QueryMaker.insertRow(new ManufacturingMachine(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillPackaging() {

        let packagings = [
            ['Sachet', 20, 10, 1],
            ['Boite', 10, 25, 2],
            ["Echantillon", 200, 3, 3]
        ];

        packagings.forEach(function (value) {
            let b = QueryMaker.insertRow(new Packaging(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillPackagingMachine() {

        let packagingmachines = [
            [500, 15, 1, 1],
            [500, 15, 1, 2],
            [750, 25, 1, 3],
            [200, 10, 2, 4],
            [200, 10, 2, 5],
            [150, 15, 3, 6]
        ];

        packagingmachines.forEach(function (value) {
            let b = QueryMaker.insertRow(new PackagingMachine(...value));
            // db.execute(b.query, b.binds);

        });


    }

    static async fillTransportType() {

        let transports = [
            ['Camion', 33, 40, 1],
            ['Avion', 20, 20, 2],
            ['Bateau', 60, 30, 3]
        ];

        transports.forEach(function (value) {
            let b = QueryMaker.insertRow(new TransportType(...value));
            // db.execute(b.query, b.binds);

        });

    }

    static async fillEmployee() {
        let employees = [];

        for (let i = 0; i < 10; i++) {
            employees.push(1);
            employees.push(2);
        }

        employees.forEach(function (value) {
            let b = QueryMaker.insertRow(new Employee(value));
            // db.execute(b.query, b.binds);

        });

    }

    static async fillManufacturingMachineConfig() {

        let manufacturingMachineConfig = [
            [750, 25, 1, 1],
            [1230, 45, 2, 2],
            [625, 25, 3, 3]
        ];

        manufacturingMachineConfig.forEach(function (value) {
            let b = QueryMaker.insertRow(new ManufacturingMachineConfig(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillManufacturingMachineSetup() {

        let setups = [
            [1, 1],
            [2, 2],
            [3, 3],
            [2, 4],
            [3, 4]
        ];

        setups.forEach(function (value) {
            let b = QueryMaker.insertRow(new ManufacturingMachineSetup(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillCostByPackaging() {

        let costByPackaging = [
            [1, 1, 2.31],
            [2, 1, 2.99],
            [3, 1, 3.94],
            [4, 1, 2.75],
            [5, 1, 3.84],
            [6, 1, 3.08],
            [7, 1, 2.93],
            [8, 1, 2.11],
            [9, 1, 2.37],
            [10, 1, 3.66],
            [11, 1, 2.47],
            [12, 1, 2.05],
            [13, 1, 3.92],
            [14, 1, 2.16],
            [15, 1, 2.49],
            [16, 1, 3.47],
            [17, 1, 3.92],
            [18, 1, 3.17],
            [19, 1, 2.27],
            [20, 1, 3.25],
            [21, 1, 2.9],
            [22, 1, 2.36],
            [23, 1, 2.04],
            [24, 1, 3.77],
            [25, 1, 2.74],
            [26, 1, 3.59],
            [27, 1, 3.99],
            [1, 2, 3.42],
            [2, 2, 4.43],
            [3, 2, 5.83],
            [4, 2, 4.07],
            [5, 2, 5.68],
            [6, 2, 4.56],
            [7, 2, 4.34],
            [8, 2, 3.12],
            [9, 2, 3.51],
            [10, 2, 5.42],
            [11, 2, 3.66],
            [12, 2, 3.03],
            [13, 2, 5.80],
            [14, 2, 3.20],
            [15, 2, 3.69],
            [16, 2, 5.14],
            [17, 2, 5.80],
            [18, 2, 4.69],
            [19, 2, 3.36],
            [20, 2, 4.81],
            [21, 2, 4.29],
            [22, 2, 3.49],
            [23, 2, 3.02],
            [24, 2, 5.58],
            [25, 2, 4.06],
            [26, 2, 5.31],
            [27, 2, 5.91],
            [1, 3, 0.23],
            [2, 3, 0.30],
            [3, 3, 0.39],
            [4, 3, 0.28],
            [5, 3, 0.38],
            [6, 3, 0.31],
            [7, 3, 0.29],
            [8, 3, 0.21],
            [9, 3, 0.24],
            [10, 3, 0.37],
            [11, 3, 0.25],
            [12, 3, 0.21],
            [13, 3, 0.39],
            [14, 3, 0.22],
            [15, 3, 0.25],
            [16, 3, 0.35],
            [17, 3, 0.39],
            [18, 3, 0.32],
            [19, 3, 0.23],
            [20, 3, 0.33],
            [21, 3, 0.29],
            [22, 3, 0.24],
            [23, 3, 0.20],
            [24, 3, 0.38],
            [25, 3, 0.27],
            [26, 3, 0.36],
            [27, 3, 0.40]
        ];

        costByPackaging.forEach(function (value) {
            let b = QueryMaker.insertRow(new CostByPackaging(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillCandyCombo() {
        let candy = await db.mapQuery("SELECT CANDYID FROM CANDYLIST");
        let tastes = await db.mapQuery("SELECT TASTEID FROM TASTELIST");
        let textures = await db.mapQuery("SELECT textureID FROM TEXTURELIST");
        let colors = await db.mapQuery("SELECT COLORID FROM COLORLIST");
        let combos = [];

        candy.forEach(cndy => {
            colors.forEach(clr => {
                tastes.forEach(tst => {
                    textures.forEach(txt => {
                        combos.push([cndy.candyid, clr.colorid, tst.tasteid, txt.textureid]);
                    });
                });
            });
        });

        combos.forEach(function (value) {
            let b = QueryMaker.insertRow(new CandyCombo(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillCandyReference() {

        let pkg = await db.mapQuery("SELECT PACKAGINGID FROM PACKAGING");
        let combo = await db.mapQuery("SELECT CANDYCOMBOID FROM CANDYCOMBO");
        let reference = [];


        pkg.forEach(pack => {
            combo.forEach(cmb => {
                reference.push([pack.packagingid, cmb.candycomboid]);
            })
        });

        reference.forEach(function (value) {
            let b = QueryMaker.insertRow(new CandyReference(...value));
            // db.execute(b.query, b.binds);

        });

    }

    static async fillCandyRecipe() {
        let receips = [
            [1, 1, 6],
            [2, 1, 10],
            [3, 1, 3],
            [4, 1, 6],
            [5, 1, 4],
            [6, 1, 9],
            [7, 1, 3],
            [8, 1, 4],
            [9, 1, 8],
            [10, 1, 7],
            [11, 1, 5],
            [12, 1, 2],
            [13, 1, 10],
            [14, 1, 3],
            [15, 1, 9],
            [16, 1, 3],
            [17, 1, 7],
            [18, 1, 7],
            [19, 1, 5],
            [20, 1, 10],
            [21, 1, 1],
            [22, 1, 9],
            [23, 1, 4],
            [24, 1, 7],
            [25, 1, 5],
            [26, 1, 6],
            [27, 1, 2],
            [1, 2, 7],
            [2, 2, 9],
            [3, 2, 1],
            [4, 2, 5],
            [5, 2, 10],
            [6, 2, 7],
            [7, 2, 8],
            [8, 2, 8],
            [9, 2, 5],
            [10, 2, 4],
            [11, 2, 8],
            [12, 2, 9],
            [13, 2, 10],
            [14, 2, 5],
            [15, 2, 9],
            [16, 2, 2],
            [17, 2, 7],
            [18, 2, 3],
            [19, 2, 3],
            [20, 2, 7],
            [21, 2, 3],
            [22, 2, 4],
            [23, 2, 9],
            [24, 2, 1],
            [25, 2, 10],
            [26, 2, 7],
            [27, 2, 3],
            [1, 3, 7],
            [2, 3, 7],
            [3, 3, 4],
            [4, 3, 7],
            [5, 3, 9],
            [6, 3, 1],
            [7, 3, 9],
            [8, 3, 7],
            [9, 3, 6],
            [10, 3, 1],
            [11, 3, 6],
            [12, 3, 4],
            [13, 3, 5],
            [14, 3, 4],
            [15, 3, 4],
            [16, 3, 7],
            [17, 3, 5],
            [18, 3, 9],
            [19, 3, 2],
            [20, 3, 7],
            [21, 3, 7],
            [22, 3, 3],
            [23, 3, 1],
            [24, 3, 2],
            [25, 3, 5],
            [26, 3, 1],
            [27, 3, 3],
            [1, 4, 7],
            [2, 4, 1],
            [3, 4, 4],
            [4, 4, 8],
            [5, 4, 7],
            [6, 4, 2],
            [7, 4, 2],
            [8, 4, 6],
            [9, 4, 8],
            [10, 4, 9],
            [11, 4, 9],
            [12, 4, 9],
            [13, 4, 5],
            [14, 4, 3],
            [15, 4, 1],
            [16, 4, 9],
            [17, 4, 10],
            [18, 4, 9],
            [19, 4, 4],
            [20, 4, 6],
            [21, 4, 2],
            [22, 4, 10],
            [23, 4, 2],
            [24, 4, 10],
            [25, 4, 8],
            [26, 4, 3],
            [27, 4, 9],
            [1, 5, 1],
            [2, 5, 10],
            [3, 5, 10],
            [4, 5, 7],
            [5, 5, 2],
            [6, 5, 8],
            [7, 5, 2],
            [8, 5, 8],
            [9, 5, 9],
            [10, 5, 8],
            [11, 5, 7],
            [12, 5, 2],
            [13, 5, 4],
            [14, 5, 3],
            [15, 5, 10],
            [16, 5, 2],
            [17, 5, 3],
            [18, 5, 8],
            [19, 5, 3],
            [20, 5, 4],
            [21, 5, 8],
            [22, 5, 8],
            [23, 5, 10],
            [24, 5, 4],
            [25, 5, 10],
            [26, 5, 3],
            [27, 5, 6]

        ];

        receips.forEach(function (value) {
            let b = QueryMaker.insertRow(new CandyRecipe(...value));
            // db.execute(b.query, b.binds);

        });
    }

    static async fillShipmentType() {

        let shipmentType = [
            ['DE', 1, 1],
            ['AT', 1, 1],
            ['BE', 1, 1],
            ['BG', 1, 1],
            ['CY', 1, 1],
            ['HR', 1, 1],
            ['DK', 1, 1],
            ['ES', 1, 1],
            ['EE', 1, 1],
            ['FI', 1, 1],
            ['FR', 1, 1],
            ['GR', 1, 1],
            ['HU', 1, 1],
            ['IE', 1, 1],
            ['IT', 1, 1],
            ['LV', 1, 1],
            ['LT', 1, 1],
            ['LU', 1, 1],
            ['MT', 1, 1],
            ['NL', 1, 1],
            ['PL', 1, 1],
            ['PT', 1, 1],
            ['CZ', 1, 1],
            ['RO', 1, 1],
            ['GB', 1, 1],
            ['SK', 1, 1],
            ['SE', 1, 1],
            ['US', 1, 1],
            ['CA', 1, 0],
            ['MX', 1, 0],
            ['JP', 1, 0],
            ['CN', 1, 0],
            ['SI', 1, 0],
            ['ZA', 1, 0],
            ['DE', 2, 0],
            ['AT', 2, 0],
            ['BE', 2, 0],
            ['BG', 2, 0],
            ['CY', 2, 0],
            ['HR', 2, 0],
            ['DK', 2, 0],
            ['ES', 2, 0],
            ['EE', 2, 0],
            ['FI', 2, 0],
            ['FR', 2, 0],
            ['GR', 2, 0],
            ['HU', 2, 0],
            ['IE', 2, 0],
            ['IT', 2, 0],
            ['LV', 2, 0],
            ['LT', 2, 0],
            ['LU', 2, 0],
            ['MT', 2, 0],
            ['NL', 2, 0],
            ['PL', 2, 0],
            ['PT', 2, 0],
            ['CZ', 2, 0],
            ['RO', 2, 0],
            ['GB', 2, 0],
            ['SK', 2, 0],
            ['SE', 2, 0],
            ['US', 2, 0],
            ['CA', 2, 1],
            ['MX', 2, 1],
            ['JP', 2, 1],
            ['CN', 2, 0],
            ['SI', 2, 1],
            ['ZA', 2, 0],
            ['DE', 3, 0],
            ['AT', 3, 0],
            ['BE', 3, 0],
            ['BG', 3, 0],
            ['CY', 3, 0],
            ['HR', 3, 0],
            ['DK', 3, 0],
            ['ES', 3, 0],
            ['EE', 3, 0],
            ['FI', 3, 0],
            ['FR', 3, 0],
            ['GR', 3, 0],
            ['HU', 3, 0],
            ['IE', 3, 0],
            ['IT', 3, 0],
            ['LV', 3, 0],
            ['LT', 3, 0],
            ['LU', 3, 0],
            ['MT', 3, 0],
            ['NL', 3, 0],
            ['PL', 3, 0],
            ['PT', 3, 0],
            ['CZ', 3, 0],
            ['RO', 3, 0],
            ['GB', 3, 0],
            ['SK', 3, 0],
            ['SE', 3, 0],
            ['US', 3, 0],
            ['CA', 3, 0],
            ['MX', 3, 0],
            ['JP', 3, 0],
            ['CN', 3, 1],
            ['SI', 3, 0],
            ['ZA', 3, 1]
        ];

        shipmentType.forEach(function (value) {
            let b = QueryMaker.insertRow(new ShipmentType(...value));
            // db.execute(b.query, b.binds);

        });
    }
}

module.exports = PreFilling;