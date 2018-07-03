class Article {
    constructor(articleCreation, articleBoxing, candyLotID, candyReferenceID, packagingMachineID, employeeID, cardBoardBoxID, referenceLotID = null){

        this.articleCreation = articleCreation;
        this.articleBoxing =  articleBoxing;

       
            this.candyLotID = candyLotID;
        

        
            this.candyReferenceID = candyReferenceID;
       

        
            this.packagingMachineID = packagingMachineID;
        

        
            this.employeeID = employeeID;
      

        
            this.cardBoardBoxID = cardBoardBoxID;
        

        if(referenceLotID!= null){
            this.referenceLotID = referenceLotID;
        }

        



    }
}

module.exports = Article;
