class CandyReference {
    constructor(packagingID, candyReferenceID_candycombo,candyReferenceID = null){

        this.packagingID = packagingID;
        this.candyReferenceID_candycombo = candyReferenceID_candycombo;

        if(candyreferenceID!= null){
            this.candyreferenceID = candyreferenceID;
        }
    }
}

module.exports = CandyReference;