class CandyLot {
    constructor(candyLotCreation, candyLotVolume, candyReferenceID, manuFacturingMachineSetupID, candyLotID = null){

        this.candyLotCreation = candyLotCreation,
        this.candyLotVolume = candyLotVolume,

        
            this.candyReferenceID = candyReferenceID;
       

        
            this.manuFacturingMachineSetupID = manuFacturingMachineSetupID;
        

        if(candyLotID!= null){
            this.candyLotID = candyLotID;
        }

    }
}

module.exports = CandyLot;
