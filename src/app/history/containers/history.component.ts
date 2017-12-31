import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, AppConfig } from '../../config';
import * as PhotoAction from '../../photo/actions/photo';
import { Period } from '../../photo/models/period';
import * as HistoryAction from '../actions/history';
import * as fromHistory from '../reducers';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  perPage = this.appConfig.perPage;
  photos$ = this.store.select(fromHistory.getHistoryPhotos);
  page$ = this.store.select(fromHistory.getPage);
  total$ = this.store.select(fromHistory.getHistoryTotal);
  period$ = this.store.select(fromHistory.getPeriod);
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromHistory.HistoryState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {
    this.period$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(period => this.store.dispatch(new PhotoAction.Load(period)));
  }

  onPeriodChange(period: Period) {
    this.store.dispatch(new HistoryAction.SetPeriod(period));
  }

  next() {
    this.store.dispatch(new HistoryAction.NextPage());
  }

  prev() {
    this.store.dispatch(new HistoryAction.PrevPage());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
