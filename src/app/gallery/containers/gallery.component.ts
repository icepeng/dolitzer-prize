import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { APP_CONFIG, AppConfig } from '../../config';
import * as GalleryAction from '../actions/gallery';
import * as fromGallery from '../reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  perPage = this.appConfig.perPage;
  photos$ = this.store.select(fromGallery.getPagePhotos);
  page$ = this.store.select(fromGallery.getPage);
  total$ = this.store.select(fromGallery.getGalleryTotal);

  constructor(
    private store: Store<fromGallery.GalleryState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {}

  next() {
    this.store.dispatch(new GalleryAction.NextPage());
  }

  prev() {
    this.store.dispatch(new GalleryAction.PrevPage());
  }
}
