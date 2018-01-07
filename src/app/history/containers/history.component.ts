import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import * as ListAction from '../actions/list';
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
  photoIds$ = this.store.select(fromHistory.getSelectedHistoryPhotoIds);
  sortColumn$ = this.store.select(fromHistory.getSortColumn);
  sortOrder$ = this.store.select(fromHistory.getSortOrder);
  period$ = this.store.select(fromHistory.getSelectedPeriod);
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromHistory.HistoryState>,
    private router: Router,
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
    this.store.dispatch(new ListAction.NextPage());
  }

  prev() {
    this.store.dispatch(new ListAction.PrevPage());
  }

  onSortChange(sort: any) {
    this.store.dispatch(new ListAction.Sort(sort));
  }

  onSelect(photo: Photo) {
    this.router.navigate(['/', 'gallery', photo.id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
