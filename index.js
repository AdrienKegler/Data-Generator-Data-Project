const PreFilling = require('./PreFilling');
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
const ShipmentType = require('./ShipmentType');
const Ingredient = require('./Ingredient');
const ddg = require('./DynamicDataGenerator');
const db = require('./db');





(async () => {

    await db.connect();


    var referenceList = await ddg.generateEightyTwenty();

    for (let ordernb = 0; ordernb < 1; ordernb++) {
        let orderId = null;
        try {
            orderId = await ddg.createOrder(referenceList);
        }
        catch (e) {
            console.log("An order hasn't been received");
            console.log(e);
        }
        if(orderId !== null){
            await db.connect();
            try{
                await ddg.processOrder(orderId);
            }catch (e) {
                console.log("We haven't been able to execute the order " + orderId);
                console.log(e);
            }
        }
    }
})();

