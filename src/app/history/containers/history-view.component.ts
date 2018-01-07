import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromHistory from '../reducers';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
})
export class HistoryViewComponent implements OnInit {
  photoIds$ = this.store.select(fromHistory.getSelectedHistoryPhotoIds);
  sortColumn$ = this.store.select(fromHistory.getSortColumn);
  sortOrder$ = this.store.select(fromHistory.getSortOrder);

  constructor(private store: Store<fromHistory.State>) {}

  ngOnInit() {}
}
