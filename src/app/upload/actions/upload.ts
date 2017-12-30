import { Action } from '@ngrx/store';

import { Upload } from '../models/upload';

export enum UploadActionTypes {
  Init = '[Upload] Init',
  Submit = '[Upload] Submit',
  SubmitSuccess = '[Upload] Submit Success',
  SubmitFailure = '[Upload] Submit Failure',
}

export class Init implements Action {
  readonly type = UploadActionTypes.Init;
}

export class Submit implements Action {
  readonly type = UploadActionTypes.Submit;

  constructor(public payload: Upload) {}
}

export class SubmitSuccess implements Action {
  readonly type = UploadActionTypes.SubmitSuccess;

  constructor(public payload: number) {}
}

export class SubmitFailure implements Action {
  readonly type = UploadActionTypes.SubmitFailure;

  constructor(public payload: any) {}
}

export type UploadActions = Init | Submit | SubmitSuccess | SubmitFailure;
