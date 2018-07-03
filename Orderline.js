class Orderline {
    constructor(orderlineQuantity,clientOrderID,candyReferenceID,countryID,orderlineID = null){

        this.orderlineQuantity = orderlineQuantity;
        this.clientOrderID = clientOrderID;
        this.candyReferenceID = candyReferenceID;
        this.countryID = countryID;

        if(orderlineID!= null){
            this.orderlineID = orderlineID;
        }

    }
}

module.exports = Orderline;