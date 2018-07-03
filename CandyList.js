class CandyList {
    constructor(candyName, candyManifacturingCost, candyConditionningCost, candyShipmentCost, candyOverHeadCost, candyID = null){

        this.candyName = candyName;
        this.candyManifacturingCost = candyManifacturingCost;
        this.candyConditionningCost = candyConditionningCost;
        this.candyShipmentCost = candyShipmentCost;
        this.candyOverHeadCost = candyOverHeadCost;

        if(candyID!= null){
            this.candyID = candyID;
        }

    }
}

module.exports = CandyList;
