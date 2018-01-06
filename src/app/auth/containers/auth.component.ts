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
    this.store.dispatch(new Auth.Login());
  }
}
