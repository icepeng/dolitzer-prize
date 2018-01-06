import { combineLatest, map } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from '../../config';
import { Photo } from '../../photo/models/photo';
import * as GalleryAction from '../actions/gallery';
import * as fromGallery from '../reducers';
import * as fromPhoto from '../../photo/reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  perPage = this.appConfig.perPage;
  page$ = this.store.select(fromGallery.getPage);
  total$ = this.store.select(fromGallery.getGalleryPhotosTotal);
  photos$: Observable<Photo[]>;

  constructor(
    private store: Store<fromGallery.GalleryState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {
    this.photos$ = this.store
      .select(fromGallery.getGalleryPhotoIds)
      .pipe(
        combineLatest(this.store.select(fromPhoto.getPhotoEntities)),
        map(([ids, entities]) => ids.map(id => entities[id])),
        combineLatest(this.store.select(fromGallery.getPage)),
        map(([photos, page]) =>
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
