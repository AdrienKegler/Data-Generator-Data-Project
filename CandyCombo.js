class CandyCombo {
    constructor(candyID, colorID, tasteID, textureID, candyReferenceID = null){

      
            this.candyID = candyID;
       

        
            this.colorID = colorID;
       

        
            this.tasteID = tasteID;
        

        
            this.textureID = textureID;
        

        if(candyReferenceID!=null){
            this.candyReferenceID = candyReferenceID;
        }

    }
}

module.exports = CandyCombo;
