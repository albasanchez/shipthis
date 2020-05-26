import { Controller, Get, Req} from '@nestjs/common';
import { GenerateFileService } from './generate-file.service';
import { UserInvoice } from './dto/userInvoice.dto';
import { InfoInvoice } from './dto/infoInvoice.dto';
//import { UserData } from 'src/dao/entity/user_data.entity';
import { AddressInvoice } from './dto/addressInvoice.dto';
import { MountInvoice } from './dto/mountInvoice.dto';
import { AddressEnterprise } from './dto/addressEnterprise.dto';


@Controller('generate')
export class GenerateFileController {
    constructor(private generateFileService:GenerateFileService) {}
    
    @Get('/pdf')
    async test() {
        const user = new UserInvoice("1","Gino", "Martin", "28420486", "gmlm_120@hotmail.com","04142386726","wwww.google.com");
        const address = new AddressInvoice("Venezuela","Caracas", "1000", "Venezuela", "Maracaibo", "2100");
        const mount1 = new MountInvoice("Costo por envio",100000, 1) 
        const mount2 = new MountInvoice("Costo por peso",50000,2) 
        const mount3 = new MountInvoice("Costo por empaquetar",30000,1)
        const mount4 = new MountInvoice("Costo por exceso",70000,1)
        const mount5 = new MountInvoice("Comisión",80000,1)
        const mountList = [mount1,mount2,mount3,mount4,mount5];
        const enterprise = new AddressEnterprise("Venezuela", "Caracas", "J0234324")
        const userInvoice=new InfoInvoice(user, mountList, address,"1234", enterprise);

        this.generateFileService.createInvoice(userInvoice)
   
        return userInvoice;
    }
}