import { Photo } from '../models/photo';
import { Action } from '@ngrx/store';

export enum LikeActionTypes {
  Like = '[Like] Like',
  LikeSuccess = '[Like] Like Success',
  LikeFailure = '[Like] Like Failure',
}

export class Like implements Action {
  readonly type = LikeActionTypes.Like;

  constructor(public payload: number) {}
}

export class LikeSuccess implements Action {
  readonly type = LikeActionTypes.LikeSuccess;

  constructor(public payload: number) {}
}

export class LikeFailure implements Action {
  readonly type = LikeActionTypes.LikeFailure;

  constructor(public payload: any) {}
}

export type LikeActions = Like | LikeSuccess | LikeFailure;
