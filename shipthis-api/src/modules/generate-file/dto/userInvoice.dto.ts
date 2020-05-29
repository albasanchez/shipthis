
export class UserInvoice{
    name:String;
    lastName:String;
    ci:String;
    email:String;
    phone:String
    id:String
    url:String

    constructor(userId, userName, userLastName, userCi, userEmail, userPhone, userUrl){
        this.id = userId;
        this.name = userName;
        this.lastName = userLastName;
        this.ci = userCi;
        this.email = userEmail;
        this.phone = userPhone;
        this.url = userUrl
    }
}
