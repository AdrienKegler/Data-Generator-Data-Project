class CostByPackaging {
    constructor(candyID, PackagingID, costByPackagingCost, costByPackagingID = null){

        this.costByPackagingCost = costByPackagingCost;
        this.PackagingID = PackagingID;
        this.candyID = candyID;
       

        if(costByPackagingID!= null){
            this.costByPackagingID = costByPackagingID;
        }

    }
}

module.exports = CostByPackaging;
