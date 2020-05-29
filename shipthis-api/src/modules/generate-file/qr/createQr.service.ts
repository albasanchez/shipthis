import { Injectable } from "@nestjs/common";

var QRCode = require('qrcode')

@Injectable()
export class CreateQrService {

    constructor(){}
  
    async createQr(url){

        return await QRCode.toDataURL(url);
           
    }
}