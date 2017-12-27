import { Action } from '@ngrx/store';

import { Photo } from '../models/photo';

export enum PhotoActionTypes {
  Load = '[Photo] Load',
  LoadSuccess = '[Photo] Load Success',
  LoadFailure = '[Photo] Load Failure',
}

export class Load implements Action {
  readonly type = PhotoActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = PhotoActionTypes.LoadSuccess;

  constructor(public payload: { photos: Photo[] }) {}
}

export class LoadFailure implements Action {
  readonly type = PhotoActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export type PhotoActions = Load | LoadSuccess | LoadFailure;
