class ManufacturingMachineConfig {
    constructor(manufacturingMachineConfigCadency, manufacturingMachineConfigDelay, tasteID , manufacturingMachineConfigID = null){

        this.manufacturingMachineConfigCadency = manufacturingMachineConfigCadency;
        this.manufacturingMachineConfigDelay = manufacturingMachineConfigDelay;

        
            this.tasteID = tasteID;
        

    	if(manufacturingMachineConfigID!= null){
            this.manufacturingMachineConfigID = manufacturingMachineConfigID;
        }
    }
}

module.exports = ManufacturingMachineConfig;
