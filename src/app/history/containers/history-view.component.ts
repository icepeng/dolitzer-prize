import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import * as PhotoAction from '../../photo/actions/photo';
import * as fromPhoto from '../../photo/reducers';
import * as fromHistory from '../reducers';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
})
export class HistoryViewComponent implements OnInit, OnDestroy {
  photo$ = this.store.select(fromPhoto.getSelectedPhoto);
  index$ = this.store.select(fromHistory.getIndex);
  total$ = this.store.select(fromHistory.getHistoryTotal);
  subscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromHistory.State>,
  ) {}

  ngOnInit() {
    this.subscription$ = this.route.params.subscribe(params =>
      this.store.dispatch(new PhotoAction.Select(+params['id'])),
    );
  }

  prev() {
    this.store
      .select(fromHistory.getPrevId)
      .pipe(take(1), filter(id => !!id))
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  next() {
    this.store
      .select(fromHistory.getNextId)
      .pipe(take(1), filter(id => !!id))
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
