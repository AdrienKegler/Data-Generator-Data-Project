class CandyReference {
    constructor(packagingID, candycomboID, candyReferenceID = null){

        this.packagingID = packagingID;
        this.candycomboID = candycomboID;

        if(candyReferenceID!= null){
            this.candyReferenceID = candyReferenceID;
        }
    }
}

module.exports = CandyReference;