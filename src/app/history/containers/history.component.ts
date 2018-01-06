import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  map,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, AppConfig } from '../../config';
import { Period } from '../../photo/models/period';
import { Photo } from '../../photo/models/photo';
import * as fromPhoto from '../../photo/reducers';
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
  page$ = this.store.select(fromHistory.getPage);
  total$ = this.store.select(fromHistory.getSelectedPhotosTotal);
  period$ = this.store.select(fromHistory.getSelectedPeriod);
  photos$: Observable<Photo[]>;
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

    this.photos$ = this.store
      .select(fromHistory.getSelectedHistoryPhotoIds)
      .pipe(
        combineLatest(this.store.select(fromPhoto.getPhotoEntities)),
        map(([ids, entities]) => ids.map(id => entities[id])),
        combineLatest(this.store.select(fromHistory.getPage)),
        map(([photos, page]) =>
          photos.slice(
            (page - 1) * this.appConfig.perPage,
            page * this.appConfig.perPage,
          ),
        ),
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
