import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { User } from '../../user/models/user';

@Injectable()
export class AuthService {
  constructor() {}

  decodeToken(token: string): User {
    const decoded = jwtDecode<User>(token);
    return {
      id: decoded.id,
      battletag: decoded.battletag,
    };
  }
}
