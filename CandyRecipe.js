class CandyRecipe {
    constructor(candyID, ingredientID, candyRecipeQuantity, candyRecipeID = null){
    	
        this.candyRecipeQuantity = candyRecipeQuantity;
        this.ingredientID = ingredientID;
        this.candyID = candyID;

     

        if(candyRecipeID != null){
            this.candyRecipeID = candyRecipeID;
        }

        
           
       
    }
}

module.exports = CandyRecipe;
