class Country {
    constructor(countryName,countryID = null){

        this.countryName = countryName;

        if(countryID!= null){
            this.countryID = countryID;
        }

    }
}

module.exports = Country;