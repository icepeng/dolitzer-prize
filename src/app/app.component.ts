import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as Auth from './auth/actions/auth';
import * as fromRoot from './reducers';
import * as fromAuth from './auth/reducers';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('content') content;
  user$ = this.store.select(fromAuth.getUser);
  isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);

  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(evt => (this.content.nativeElement.scrollTop = 0));
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
