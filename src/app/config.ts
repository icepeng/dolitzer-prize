// tslint:disable:max-line-length
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiAddress: string;
  perPage: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  apiAddress: 'https://localhost:3001/api/v1',
  perPage: 6,
};
