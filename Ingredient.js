class Ingredient {
    constructor(ingredientName, ingredientStock, ingredientPalletSize, ingredientPacketSize, ingredientID = null){
        this.ingredientName = ingredientName;
        this.ingredientStock = ingredientStock;
        this.ingredientPalletSize = ingredientPalletSize;
        this.ingredientPacketSize = ingredientPacketSize;

        if(ingredientID != null){
            this.ingredientID = ingredientID;
        }
    }
}

module.exports = Ingredient;
