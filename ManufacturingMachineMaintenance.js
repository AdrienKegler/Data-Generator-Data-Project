class ManufacturingMachineMaintenance {
    constructor(manufacturingMachineMaintenanceTime, manufacturingMachineSetupID, manufacturingMachineMaintenanceID = null){
        this.manufacturingMachineMaintenanceTime = manufacturingMachineMaintenanceTime;

       
            this.manufacturingMachineSetupID = manufacturingMachineSetupID;
       

        if(manufacturingMachineMaintenanceID!= null){
            this.manufacturingMachineMaintenanceID = manufacturingMachineMaintenanceID;
        }
    }
}

module.exports = ManufacturingMachineMaintenance;
