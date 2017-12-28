import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Upload from '../actions/upload';
import * as fromUpload from '../reducers';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  error$ = this.store.select(fromUpload.getError);

  constructor(private store: Store<fromUpload.UploadState>) {}

  ngOnInit() {
    this.store.dispatch(new Upload.Init());
    this.store.dispatch(
      new Upload.Submit({
        upload: {
          title: 'hi',
          imgLink: 'yoshi',
        },
      }),
    );
  }
}
