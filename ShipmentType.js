class ShipmentType {
    constructor(shipmentTypeAvailable, countryID, transportTypeID, shipmentTypeID = null){

        this.shipmentTypeAvailable = shipmentTypeAvailable;
        this.countryID = countryID;

        
        	this.transportTypeID = transportTypeID;
        

        if(shipmentTypeID = null){
        	this.shipmentTypeID = shipmentTypeID;
        }
    }
}

module.exports = ShipmentType;
