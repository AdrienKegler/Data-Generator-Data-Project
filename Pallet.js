class Pallet {
    constructor(palletLoadTime, shipmentTypeID, clientOrderID, palletID = null){

        this.palletLoadTime = palletLoadTime;

        
        	this.shipmentTypeID = shipmentTypeID;
       

        
        	this.clientOrderID = clientOrderID;
        

        if(palletID!= null){
            this.palletID = palletID;
        }
    }
}

module.exports = Pallet;
