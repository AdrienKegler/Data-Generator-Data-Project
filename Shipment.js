class Shipment {
    constructor(shippingDeparture, shipmentTypeId_isShippedLikeThat, shipmentTypeID = null){

        this.shippingDeparture = shippingDeparture;

        
        	this.shipmentTypeId_isShippedLikeThat = shipmentTypeId_isShippedLikeThat;
        

        if(shipmentTypeID = null){
        	this.shipmentTypeID = shipmentTypeID;
        }
    }
}

module.exports = Shipment;
