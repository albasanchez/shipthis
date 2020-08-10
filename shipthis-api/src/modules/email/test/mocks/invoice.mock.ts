import { toBuffer } from 'qrcode';

export class QrCodeMock {
  toDataUrl() {
    return jest.fn().mockImplementation(() => {
      return 'qrCode';
    });
  }
}

export class ResponseMock {
  render() {
    return jest.fn().mockImplementation((invoice, data, callback) => {
      callback(null, 'htmldata');
    });
  }
}

export const pdfCreateMock: any = {
  create: jest.fn().mockReturnThis(),
  toBuffer: jest.fn().mockImplementation((callback) => {
    callback(null, 'pdfdata');
  }),
};
