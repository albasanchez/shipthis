export class SendInvoiceMail {
    idUser:String;
    sendTo:String;

    
    constructor(idUser, sendTo) {
        this.idUser = idUser
        this.sendTo = sendTo;
    }

}