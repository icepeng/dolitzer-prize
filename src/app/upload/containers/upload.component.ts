import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UploadAction from '../actions/upload';
import { Upload } from '../models/upload';
import * as fromUpload from '../reducers';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
  error$ = this.store.select(fromUpload.getError);
  isLoading$ = this.store.select(fromUpload.getIsLoading);

  constructor(private store: Store<fromUpload.UploadState>) {}

  ngOnInit() {
    this.store.dispatch(new UploadAction.Init());
  }

  onSubmit(form: Upload) {
    this.store.dispatch(new UploadAction.Submit(form));
  }
}
