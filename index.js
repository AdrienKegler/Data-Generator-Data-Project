const ddg = require('./DynamicDataGenerator');
const db = require('./db');





(async () => {

    await db.connect();


    var referenceList = await ddg.generateEightyTwenty();

    for (let ordernb = 0; ordernb < 1000; ordernb++) {
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