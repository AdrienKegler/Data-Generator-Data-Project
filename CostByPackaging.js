class CostByPackaging {
    constructor(costByPackagingCost, candyID, costByPackagingID = null){

        this.costByPackagingCost = costByPackagingCost;

      
            this.candyID = candyID;
       

        if(costByPackagingID!= null){
            this.costByPackagingID = costByPackagingID;
        }

    }
}

module.exports = CostByPackaging;
