export class MountInvoice {
    description:String;
    mount:number; 
    numProduct:number;

    constructor(userDescription, userMount, userNumProduct){
        this.description = userDescription;
        this.mount = userMount;
        this.numProduct = userNumProduct;
    } 
}