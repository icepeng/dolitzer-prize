import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, AppConfig } from '../../config';
import { Period } from '../../photo/models/period';
import * as HistoryAction from '../actions/history';
import * as PageAction from '../actions/page';
import * as fromHistory from '../reducers';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  perPage = this.appConfig.perPage;
  photos$ = this.store.select(fromHistory.getPagePhotos);
  page$ = this.store.select(fromHistory.getPage);
  total$ = this.store.select(fromHistory.getSelectedPhotosTotal);
  period$ = this.store.select(fromHistory.getSelectedPeriod);
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromHistory.HistoryState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {
    this.period$
      .pipe(
        withLatestFrom(this.store.select(fromHistory.getSelectedHistory)),
        filter(([period, history]) => period && !history),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([period]) =>
        this.store.dispatch(new HistoryAction.Load(period)),
      );
  }

  onPeriodChange(period: Period) {
    this.store.dispatch(new HistoryAction.SetPeriod(period));
  }

  next() {
    this.store.dispatch(new PageAction.NextPage());
  }

  prev() {
    this.store.dispatch(new PageAction.PrevPage());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
