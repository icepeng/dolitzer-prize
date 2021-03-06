import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromGallery from '../reducers';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent implements OnInit {
  photoIds$ = this.store.select(fromGallery.getGalleryPhotoIds);
  sortColumn$ = this.store.select(fromGallery.getSortColumn);
  sortOrder$ = this.store.select(fromGallery.getSortOrder);

  constructor(private store: Store<fromGallery.State>) {}

  ngOnInit() {}
}
