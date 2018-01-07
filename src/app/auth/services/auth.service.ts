import { Decoded } from '../models/token';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { User } from '../../user/models/user';

@Injectable()
export class AuthService {
  constructor() {}

  login(): Promise<string> {
    return new Promise((resolve, reject) => {
      const receiveMessage = (event: any) => {
        window.removeEventListener('message', receiveMessage);
        resolve(event.data);
      };
      window.open(
        // TODO: change link on production
        // tslint:disable-next-line:max-line-length
        'https://kr.battle.net/login/ko/?ref=https://kr.battle.net/oauth/authorize?response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fapi.icepeng.com:3002%252Fapi%252Fv1%252Fauth%252Fbnet%252Fcallback%26client_id%3Djkwah5ej8huy3es57s22c3zgx8y9z3vd&app=oauth',
      );
      window.addEventListener('message', receiveMessage);
    });
  }

  decodeToken(token: string): Decoded<User> {
    const decoded = jwtDecode<Decoded<User>>(token);
    return {
      id: decoded.id,
      battletag: decoded.battletag,
      exp: decoded.exp,
    };
  }
}
