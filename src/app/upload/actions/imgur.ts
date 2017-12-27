import { Action } from '@ngrx/store';

import { ImgurResponse } from '../models/imgur';

export enum ImgurActionTypes {
  Upload = '[Upload] Upload',
  UploadSuccess = '[Upload] Upload Success',
  UploadFailure = '[Upload] Upload Failure',
}

export class Upload implements Action {
  readonly type = ImgurActionTypes.Upload;

  constructor(public payload: { image: File }) {}
}

export class UploadSuccess implements Action {
  readonly type = ImgurActionTypes.UploadSuccess;

  constructor(public payload: { imgur: ImgurResponse }) {}
}

export class UploadFailure implements Action {
  readonly type = ImgurActionTypes.UploadFailure;

  constructor(public payload: any) {}
}

export type UploadActions = Upload | UploadSuccess | UploadFailure;
