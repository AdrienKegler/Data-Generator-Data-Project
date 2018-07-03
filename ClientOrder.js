class ClientOrder {
    constructor(clientOrderTime,clientOrderID = null){

        this.clientOrderTime = clientOrderTime;

        if(clientOrderID!= null){
            this.clientOrderID = clientOrderID;
        }

    }
}

module.exports = ClientOrder;