import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor() {}

  decodeToken(token: string): Observable<User> {
    try {
      const decoded = jwtDecode(token);
      if (this.isTokenExpired(decoded)) {
        throw new Error('Expired Token');
      }
      return of({
        id: decoded.id,
        battletag: decoded.battletag,
      });
    } catch (err) {
      return _throw(err);
    }
  }

  isTokenExpired(decoded: { exp: number }, offsetSeconds?: number): boolean {
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
