class Packaging {
    constructor(packagingName, packagingMaxInBox, packagingCandyCapacity,packagingID = null){

        this.packagingName= packagingName;
        this.packagingMaxInBox = packagingMaxInBox;
        this.packagingCandyCapacity = packagingCandyCapacity;

        if(packagingID!= null){
            this.packagingID = packagingID;
        }

    }
}

module.exports = Packaging;