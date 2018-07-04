class PackagingMachine {
    constructor(packagingMachineCandency, packagingMachineDelay, packagingID, packagingMachineID) {

        this.packagingMachineDelay = packagingMachineDelay;
        this.packagingMachineCandency = packagingMachineCandency;

        this.packagingID = packagingID;

        this.packagingMachineID = packagingMachineID;
    }
}

module.exports = PackagingMachine;