import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);

  constructor(
    private http: HttpClient,
    private store: Store<fromAuth.AuthState>,
  ) {}

  ngOnInit() {}

  auth() {
    window.open(
      // TODO: change link on production
      // tslint:disable-next-line:max-line-length
      'https://kr.battle.net/login/ko/?ref=https://kr.battle.net/oauth/authorize?response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flocalhost:3001%252Fapi%252Fv1%252Fauth%252Fbnet%252Fcallback%26client_id%3Djkwah5ej8huy3es57s22c3zgx8y9z3vd&app=oauth',
    );
    window.addEventListener('message', this.receiveMessage);
  }

  receiveMessage = (event: any) => {
    this.store.dispatch(new Auth.Login(event.data));
  };
}
