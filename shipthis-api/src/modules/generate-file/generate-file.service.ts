
import { Injectable } from '@nestjs/common';
import { CreateQrService } from './qr/createQr.service';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require("path");
var base64Img = require('base64-img');
const blobStream = require('blob-stream');

@Injectable()
export class GenerateFileService {

      constructor(private qrService:CreateQrService){
        
      }
   
      async createInvoice(userInvoice) {
        let doc = new PDFDocument({ margin: 50 });
        let getUrl ;
        const stream = doc.pipe(blobStream());
        await this.generateHeader(doc,userInvoice);
        this.generateCustomerInformation(doc,userInvoice);
        this.generateInformationSend(doc,userInvoice)
        this.generateInvoiceTable(doc, userInvoice);
        this.generateFooter(doc);
        doc.end();
       
        stream.on('finish', function() {
          // get a blob you can do whatever you like with
          const blob = stream.toBlob('application/pdf');
         
          // or get a blob URL for display in the browser
          const url = stream.toBlobURL('application/pdf');
          this.getUrl = url;
        });
        return getUrl;
     //   doc.pipe(fs.createWriteStream(path.resolve("src/generateFile/files/", userInvoice.user.id + "-invoice.pdf")));
      }


        async generateHeader(doc,userInvoice ) {
        let logo = base64Img.base64Sync('src/assets/img/logo2.png');
        let imgQr =  await this.qrService.createQr(userInvoice.user.url);

        doc
          .image(logo, 50, 45, { width: 90, length:90 })
          .fillColor("#444444")
          .fontSize(10)
          .text(`${userInvoice.addressEnterprise.Country}, ${userInvoice.addressEnterprise.City}`, 200, 65, { align: "right" })
          .text(`${userInvoice.addressEnterprise.Rif}`, 200, 80, { align: "right" })
          .image(imgQr,450, 100,{ align: "right" })
          .moveDown();
      }
      
       generateFooter(doc) {
        doc
          .fontSize(10)
          .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            680,
            { align: "center", width: 500 }
          );
      }

       generateCustomerInformation(doc,invoice) {
      
        doc
          .text(`Invoice Number: ${invoice.numInvoice}`, 50, 120)
          .text(`Invoice Date: ${new Date()}`, 50, 135)
          .text(`User Information:`,50, 150)
          .text(`Name: ${invoice.user.name}, ${invoice.user.lastName} `,50, 165)
          .text(`CI:${invoice.user.ci}`,50 ,180)
          .text(`Email:${invoice.user.email}`,50 ,195)
          .text(`Phone:${invoice.user.phone}`,50, 210)
          .moveDown();
        }

        generateInformationSend(doc, invoice){
          doc
            .text(`Information of Send:`,50, 230)
            .text(`Country :${invoice.address.countryInit}, City :${invoice.address.cityInit}, Postal Code: ${invoice.address.postalCodeInit} `,50 ,250)
            .text(`Country :${invoice.address.countryEnd}, City :${invoice.address.cityEnd}, Postal Code: ${invoice.address.postalCodeEnd} `,50 ,265)
        }

       generateTableRow(doc, y, c1, c2, c3,c4, c5) {
        doc
          .text(`Description`,50,300,{align:"center"})
          .fontSize(10)
          .text(c1, 50, y)
          .text(c2, 150, y)
          .text(c3, 280, y, { width: 90, align: "right" })
          .text(c4, 370, y, { width: 90, align: "right" })
          .text(c5, 0, y, { align: "right" });
      }
      
      generateMountTotal(doc, y , mountTotal){
          doc
          .text(`Mount Total:                      ${mountTotal}`, 0, y+30,{ align: "right" } )
      }
     

       generateInvoiceTable(doc, userVoice) {
        let i;
        let mountTotal = 0;
        let invoiceTableTop = 330;
        let position;
      
        for (i = 0; i < userVoice.listMount.length; i++) {
          const item = userVoice.listMount[i];
          position = invoiceTableTop + (i + 1) * 30;
          mountTotal = mountTotal + (item.numProduct * item.mount)
          this.generateTableRow(
            doc,
            position,
            i,
            item.description,
            item.numProduct,
            item.mount,
            item.numProduct * item.mount 
          );
        }
        this.generateMountTotal(doc, position, mountTotal);
      }
      

     
  
      
      
    }
