import { ConfigService } from '../../../config/config.service';
import { IDaoTranslation } from '../interfaces/dao-translation.interface';
import axios from 'axios';
import { AppLoggerService } from 'src/log/applogger.service';
import { Configuration } from '../../../config/config.keys';
import FormData = require('form-data');
import { POEditorConnectionException } from 'src/common/exceptions';

export class DaoPOEditor implements IDaoTranslation {
  async fetchDictionary(language: string) {
    const form = this.setConnectionHeader(language);
    const dict_url: string = await this.getDictionaryURL(form);
    const dictionary = await this.getDictionary(dict_url);
    return dictionary;
  }

  private setConnectionHeader(lang: string): FormData {
    const _configService: ConfigService = new ConfigService(
      new AppLoggerService(),
    );
    const form = new FormData();
    form.append('api_token', _configService.get(Configuration.POE_API_TOKEN));
    form.append('id', _configService.get(Configuration.POE_ID));
    form.append('type', _configService.get(Configuration.POE_TYPE));
    form.append('language', lang);
    return form;
  }

  private async getDictionaryURL(form: FormData): Promise<string> {
    const _configService: ConfigService = new ConfigService(
      new AppLoggerService(),
    );
    const dict_url: string = await axios
      .post(_configService.get(Configuration.POE_URL), form, {
        headers: form.getHeaders(),
      })
      .then(res => res.data.result.url)
      .catch(error => {
        throw new POEditorConnectionException();
      });
    return dict_url;
  }

  private async getDictionary(url: string): Promise<any> {
    const dictionary = await axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        throw new POEditorConnectionException();
      });
    return dictionary;
  }
}
