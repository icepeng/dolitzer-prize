import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Photo from '../../photo/actions/photo';
import * as fromPhoto from '../../photo/reducers';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
})
export class GallaryComponent implements OnInit {
  photos$ = this.store.select(fromPhoto.getAllPhotos);

  constructor(private store: Store<fromPhoto.PhotoState>) {}

  ngOnInit() {
    this.store.dispatch(new Photo.Load());
  }
}
