// tslint:disable:max-line-length
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiAddress: string;
  perPage: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  apiAddress: 'https://api.icepeng.com:3002/api/v1/',
  perPage: 6,
};
