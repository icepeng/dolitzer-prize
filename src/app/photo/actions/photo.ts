import { Action } from '@ngrx/store';

import { Photo } from '../models/photo';

export enum PhotoActionTypes {
  Load = '[Photo] Load',
  LoadSuccess = '[Photo] Load Success',
  LoadFailure = '[Photo] Load Failure',
  Select = '[Photo] Select',
}

export class Load implements Action {
  readonly type = PhotoActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = PhotoActionTypes.LoadSuccess;

  constructor(public payload: Photo[]) {}
}

export class LoadFailure implements Action {
  readonly type = PhotoActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export class Select implements Action {
  readonly type = PhotoActionTypes.Select;

  constructor(public payload: number) {}
}

export type PhotoActions = Load | LoadSuccess | LoadFailure | Select;