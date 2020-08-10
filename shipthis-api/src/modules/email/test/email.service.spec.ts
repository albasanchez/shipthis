import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../email.service';
import { emailMockModuleMetadata, bill, response } from './mocks/email.mock';
import {
  QrCodeMock,
  ResponseMock,
  pdfCreateMock,
} from './mocks/invoice.mock';
import qrcode = require('qrcode');
import pdf = require('html-pdf');

describe('EmailService', () => {
  let service: EmailService;
  const qrCodeMock: QrCodeMock = new QrCodeMock();
  const responseMock: ResponseMock = new ResponseMock();
  const data = {
    token: 'tokentest',
    email: 'test@gmail.com',
    name: 'John',
    lastname: 'Doe',
    dis_name: 'Welcome',
    percentage: 0.1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      emailMockModuleMetadata,
    ).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send emails', () => {
    it('should send welcome email', () => {
      service.sendWelcomeEmail(
        data.email,
        data.name,
        data.lastname,
        data.dis_name,
        data.percentage,
      );
    });
    it('should send recovery email', () => {
      service.sendRecoveryEmail(data.token, data.email);
    });
    it('should send discount email', () => {
      service.sendDiscountEmail(
        data.dis_name,
        data.percentage,
        data.name,
        data.lastname,
        data.email,
      );
    });
    it('should generate and send invoice email from pickup', () => {
      qrcode.toDataURL = qrCodeMock.toDataUrl();
      response.render = responseMock.render();
      jest.spyOn(pdf, 'create').mockImplementation(() => pdfCreateMock);
      service.generateInvoice(bill, response, 'pickup');
    });
    it('should generate and send invoice email from order', () => {
      qrcode.toDataURL = qrCodeMock.toDataUrl();
      response.render = responseMock.render();
      jest.spyOn(pdf, 'create').mockImplementation(() => pdfCreateMock);
      service.generateInvoice(bill, response, 'order');
    });
    it('should not generate and send invoice email', () => {
      qrcode.toDataURL = qrCodeMock.toDataUrl();
      response.render = responseMock.render();
      jest.spyOn(pdf, 'create').mockImplementation(() => pdfCreateMock);
      service.generateInvoice(bill, response, 'other');
    });
  });
});
