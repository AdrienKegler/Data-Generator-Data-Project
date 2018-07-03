class TasteList {
    constructor(tasteName, tasteID = null){

        this.tasteName = tasteName;

        if(tasteID!= null){
            this.tasteID = tasteID;
        }

    }
}

module.exports = TasteList;
