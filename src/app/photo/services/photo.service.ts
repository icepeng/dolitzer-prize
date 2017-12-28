import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../config';
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll() {
    return this.http.get<Photo[]>(`${this.appConfig.apiAddress}/photos`);
  }
}
