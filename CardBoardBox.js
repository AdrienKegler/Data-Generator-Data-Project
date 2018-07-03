class CardBoardBox {
    constructor(cardBoardBoxPalletization, palletID, cardBoadBoxID = null){

        this.cardBoardBoxPalletization = cardBoardBoxPalletization;

        
            this.palletID = palletID;
        

        if(cardBoadBoxID!= null){
            this.cardBoadBoxID = cardBoadBoxID;
        }

    }
}

module.exports = CardBoardBox;
