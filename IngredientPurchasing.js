class IngredientPurchasing {
    constructor(ingredientPurchasingQuantity, ingredientID, ingredientPurchasingID = null){
        this.ingredientPurchasingQuantity = ingredientPurchasingQuantity;
        this.ingredientID = ingredientID;
        
        if(ingredientPurchasingID != null){
            this.ingredientPurchasingID = ingredientPurchasingID;
        }
    }
}

module.exports = IngredientPurchasing;
