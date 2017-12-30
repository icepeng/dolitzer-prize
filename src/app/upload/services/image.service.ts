import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';

@Injectable()
export class ImageService {
  constructor(private http: HttpAuth,
    @Inject(APP_CONFIG) private appConfig: AppConfig) {}

  upload(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http
      .post<{ imgLink: string }>(`${this.appConfig.apiAddress}/image`, formData)
      .pipe(map(res => res.imgLink));
  }
}
