class ManufacturingMachineSetup {
    constructor(manufacturingMachineConfigID , manufacturingMachineID , manufacturingMachineSetupID = null){

    	
            this.manufacturingMachineConfigID = manufacturingMachineConfigID;
        

        
            this.manufacturingMachineID = manufacturingMachineID;
        

        if(manufacturingMachineSetupID != null){
            this.manufacturingMachineSetupID = manufacturingMachineSetupID;
        }
    }
}

module.exports = ManufacturingMachineSetup;
