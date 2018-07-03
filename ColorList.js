class ColorList {
    constructor(colorName, colorID = null){
        this.colorName = colorName;
        if(colorID != null){
            this.colorID = colorID;
        }
    }
}

module.exports = ColorList;
