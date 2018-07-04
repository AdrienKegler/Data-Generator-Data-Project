class TextureList {
    constructor(textureName, textureID = null){

        this.textureName = textureName;

        if(textureID != null){
            this.textureID = textureID;
        }
    }
}

module.exports = TextureList;
