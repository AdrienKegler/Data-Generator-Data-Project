class PackagingMachine {
    constructor( packagingMachineCandency,packagingMachineDelay,packagingID = null, packagingMachineID = null){

        this.packagingMachineDelay = packagingMachineDelay;
        this.packagingMachineCandency = packagingMachineCandency;

        if(packagingID!= null){
            this.packagingID = packagingID;
        }

        if(packagingMachineID!= null){
        	this.packagingMachineID = packagingMachineID;
        }

    }
}

module.exports = PackagingMachine;