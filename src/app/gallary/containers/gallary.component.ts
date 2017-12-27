import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromGallary from '../reducers';
import * as Gallary from '../actions/photo';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
})
export class GallaryComponent implements OnInit {
  photos$ = this.store.select(fromGallary.getPhotos);

  constructor(private store: Store<fromGallary.GallaryState>) {}

  ngOnInit() {
    this.store.dispatch(new Gallary.Load());
  }
}
