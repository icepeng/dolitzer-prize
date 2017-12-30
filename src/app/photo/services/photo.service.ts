import { Inject, Injectable } from '@angular/core';

import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {
  constructor(
    private http: HttpAuth,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll() {
    return this.http.get<Photo[]>(`${this.appConfig.apiAddress}/photos`);
  }
}
