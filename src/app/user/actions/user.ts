import { Action } from '@ngrx/store';

import { UserDetail } from '../models/user';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadSuccess = '[User] Load Success',
  LoadFailure = '[User] Load Failure',
  Select = '[User] Select',
}

export class Load implements Action {
  readonly type = UserActionTypes.Load;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = UserActionTypes.LoadSuccess;

  constructor(public payload: { user: UserDetail }) {}
}

export class LoadFailure implements Action {
  readonly type = UserActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export class Select implements Action {
  readonly type = UserActionTypes.Select;

  constructor(public payload: string) {}
}

export type UserActions = Load | LoadSuccess | LoadFailure | Select;
