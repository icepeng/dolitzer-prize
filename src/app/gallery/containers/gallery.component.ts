import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { APP_CONFIG, AppConfig } from '../../config';
import { Photo } from '../../photo/models/photo';
import * as GalleryAction from '../actions/gallery';
import * as fromGallery from '../reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  perPage = this.appConfig.perPage;
  page$ = this.store.select(fromGallery.getPage);
  total$ = this.store.select(fromGallery.getGalleryPhotosTotal);
  photoIds$ = this.store.select(fromGallery.getGalleryPhotoIds);
  sortColumn$ = this.store.select(fromGallery.getSortColumn);
  sortOrder$ = this.store.select(fromGallery.getSortOrder);

  constructor(
    private store: Store<fromGallery.GalleryState>,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {}

  next() {
    this.store.dispatch(new GalleryAction.NextPage());
  }

  prev() {
    this.store.dispatch(new GalleryAction.PrevPage());
  }

  onSortChange(sort: any) {
    this.store.dispatch(new GalleryAction.Sort(sort));
  }

  onSelect(photo: Photo) {
    this.router.navigate(['/', 'gallery', photo.id]);
  }
}
