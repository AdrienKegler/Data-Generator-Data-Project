class TransportType {
    constructor(transportTypeName, transportTypePalletMax, transportTypePalletSize, transportTypeID = null){

        this.transportTypeName = transportTypeName;
        this.transportTypePalletMax = transportTypePalletMax;
        this.transportTypePalletSize = transportTypePalletSize;

        if(transportTypeID = null){
        	this.transportTypeID = transportTypeID;
        }
    }
}

module.exports = TransportType;
