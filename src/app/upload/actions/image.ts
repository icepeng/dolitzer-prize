import { Action } from '@ngrx/store';

export enum ImageActionTypes {
  Upload = '[Upload] Upload',
  UploadSuccess = '[Upload] Upload Success',
  UploadFailure = '[Upload] Upload Failure',
}

export class Upload implements Action {
  readonly type = ImageActionTypes.Upload;

  constructor(public payload: File) {}
}

export class UploadSuccess implements Action {
  readonly type = ImageActionTypes.UploadSuccess;

  constructor(public payload: string) {}
}

export class UploadFailure implements Action {
  readonly type = ImageActionTypes.UploadFailure;

  constructor(public payload: any) {}
}

export type ImageActions = Upload | UploadSuccess | UploadFailure;
