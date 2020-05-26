import { MountInvoice } from './mountInvoice.dto' 
import { UserInvoice } from './userInvoice.dto'
import { AddressInvoice } from './addressInvoice.dto'
import { AddressEnterprise } from './addressEnterprise.dto'

export class InfoInvoice{
    
    user:UserInvoice
    listMount:MountInvoice[]
    address:AddressInvoice
    addressEnterprise: AddressEnterprise;
    numInvoice:String;

    constructor(userData, userListMount, userAddress, userNumInvoice, addresEnterprise){
        this.user = userData;
        this.listMount = userListMount;
        this.address = userAddress;
        this.numInvoice = userNumInvoice;
        this.addressEnterprise = addresEnterprise;
    }
}