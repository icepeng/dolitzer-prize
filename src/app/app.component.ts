import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { timer } from 'rxjs/observable/timer';
import { combineLatest, filter, take } from 'rxjs/operators';

import * as Auth from './auth/actions/auth';
import * as fromAuth from './auth/reducers';
import * as GalleryAction from './gallery/actions/gallery';
import * as fromRoot from './reducers';
import * as fromUser from './user/reducers';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
  battletag$ = this.store.select(fromUser.getAuthedUserBattletag);

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
  ) {}

  ngOnInit() {
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

  myPage() {
    this.store
      .select(fromUser.getAuthedUserId)
      .pipe(take(1))
      .subscribe(id => {
        this.router.navigate(['/', 'users', id]);
      });
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
