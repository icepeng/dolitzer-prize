import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../config';
import * as PhotoAction from '../../photo/actions/photo';
import { Photo } from '../../photo/models/photo';
import * as fromPhoto from '../../photo/reducers';
import * as GalleryAction from '../actions/gallery';
import * as fromGallery from '../reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  photos$ = this.store.select(fromPhoto.getAllPhotos);
  page$ = this.store.select(fromGallery.getPage);
  total$ = this.store.select(fromPhoto.getTotalPhotos);
  displayPhotos$: Observable<Photo[]>;
  perPage = this.appConfig.perPage;

  constructor(
    private store: Store<fromGallery.GalleryState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {
    this.displayPhotos$ = this.page$.pipe(
      combineLatest(this.photos$),
      map(([page, photos]) =>
        photos.slice(
          (page - 1) * this.appConfig.perPage,
          page * this.appConfig.perPage,
        ),
      ),
    );
  }

  next() {
    this.store.dispatch(new GalleryAction.NextPage());
  }

  prev() {
    this.store.dispatch(new GalleryAction.PrevPage());
  }
}
