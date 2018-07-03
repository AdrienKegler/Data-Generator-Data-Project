class PackagingMachineMaintenance {
    constructor(PackagingMachineMaintenanceTime,packagingMachineID = null, packagingMachineMaintenanceID = null){

        this.packagingMachineMaintenanceTime = packagingMachineMaintenanceTime;
       

        if(packagingMachineID!= null){
            this.packagingMachineID = packagingMachineID;
        }

        if(packagingMachineMaintenanceID!= null){
        	this.packagingMachineMaintenanceID = packagingMachineMaintenanceID;
        }

    }
}

module.exports = PackagingMachineMaintenance;