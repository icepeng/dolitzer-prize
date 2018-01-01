import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs/observable/timer';
import { combineLatest, filter, take } from 'rxjs/operators';

import * as Auth from './auth/actions/auth';
import * as fromAuth from './auth/reducers';
import * as GalleryAction from './gallery/actions/gallery';
import * as fromRoot from './reducers';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('content') content;
  isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
  battletag$ = this.store.select(fromAuth.getBattletag);

  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isLoggedIn$
      .pipe(take(1), filter(isLoggedIn => !isLoggedIn))
      .subscribe(() => {
        const localToken = localStorage.getItem('token');
        if (!localToken) {
          return;
        }
        this.store.dispatch(new Auth.Login(localToken));
      });

    timer(0, 1000 * 60)
      .pipe(
        combineLatest(this.isLoggedIn$),
        filter(([_, isLoggedIn]) => isLoggedIn),
      )
      .subscribe(() => {
        this.store.dispatch(new GalleryAction.Load());
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(evt => (this.content.nativeElement.scrollTop = 0));
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
