export class TraductionMock {
  post(resolve: boolean) {
    if (resolve) {
      return jest.fn().mockImplementation(() => {
        return Promise.resolve({ data: { result: { url: 'url' } } });
      });
    } else {
      return jest.fn().mockImplementation(() => {
        return Promise.reject();
      });
    }
  }
  get(resolve: boolean) {
    if (resolve) {
      return jest.fn().mockImplementation(() => {
        return Promise.resolve({ data: {} });
      });
    } else {
      return jest.fn().mockImplementation(() => {
        return Promise.reject();
      });
    }
  }
}
