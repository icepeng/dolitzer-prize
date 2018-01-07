import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, distinctUntilChanged, map } from 'rxjs/operators';

import { Photo } from '../models/photo';
import * as fromPhoto from '../reducers';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  @Input() photoIds$: Observable<number[]>;
  @Input() sortColumn$: Observable<keyof Photo>;
  @Input() sortOrder$: Observable<'ASC' | 'DESC'>;
  @Input() page$: Observable<number>;
  @Input() perPage: number;
  @Output() select = new EventEmitter<Photo>();

  photos$: Observable<Photo[]>;

  constructor(private store: Store<fromPhoto.PhotoState>) {}

  ngOnInit() {
    const sortedPhotos$ = this.store
      .select(fromPhoto.getPhotoEntities)
      .pipe(
        combineLatest(this.photoIds$, this.sortColumn$, this.sortOrder$),
        distinctUntilChanged(),
        map(([entities, ids, sortColumn, sortOrder]) =>
          ids
            .map(id => entities[id])
            .sort(this.sortFunc(sortColumn, sortOrder)),
        ),
      );
    this.photos$ = sortedPhotos$.pipe(
      combineLatest(this.page$),
      map(([photos, page]) =>
        photos.slice((page - 1) * this.perPage, page * this.perPage),
      ),
    );
  }

  sortFunc = (sortColumn: keyof Photo, sortOrder: 'ASC' | 'DESC') => (
    a: Photo,
    b: Photo,
  ) => {
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'ASC' ? 1 : -1;
    }
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'DESC' ? 1 : -1;
    }
    if (a.createTime > b.createTime) {
      return sortOrder === 'ASC' ? 1 : -1;
    }
    if (a.createTime < b.createTime) {
      return sortOrder === 'DESC' ? 1 : -1;
    }
    return 0;
  };
}
