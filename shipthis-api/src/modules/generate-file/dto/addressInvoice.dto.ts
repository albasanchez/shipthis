export class AddressInvoice{
    
    countryInit:String;
    cityInit:String;
    postalCodeInit:String;
    countryEnd:String;
    cityEnd:String;
    postalCodeEnd:String;
  
   

    constructor(userCountryInit,userCityInit,userPostalCodeInit,userCountryEnd,userCityEnd,
                                                                        userPostalCodeEnd){
        this.countryInit = userCountryInit;
        this.countryEnd = userCountryEnd;
        this.cityInit = userCityInit;
        this.cityEnd = userCityEnd;
        this.postalCodeInit = userPostalCodeInit;
        this.postalCodeEnd = userPostalCodeEnd;
        
    }

}