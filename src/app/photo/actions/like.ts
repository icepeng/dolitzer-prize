import { Photo } from '../models/photo';
import { Action } from '@ngrx/store';

export enum LikeActionTypes {
  Like = '[Like] Like',
  LikeSuccess = '[Like] Like Success',
  LikeFailure = '[Like] Like Failure',
  CancelLike = '[Like] Cancel Like',
  CancelLikeSuccess = '[Like] Cancel Like Success',
  CancelLikeFailure = '[Like] Cancel Like Failure',
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

export class CancelLike implements Action {
  readonly type = LikeActionTypes.CancelLike;

  constructor(public payload: number) {}
}

export class CancelLikeSuccess implements Action {
  readonly type = LikeActionTypes.CancelLikeSuccess;

  constructor(public payload: number) {}
}

export class CancelLikeFailure implements Action {
  readonly type = LikeActionTypes.CancelLikeFailure;

  constructor(public payload: any) {}
}

export type LikeActions =
  | Like
  | LikeSuccess
  | LikeFailure
  | CancelLike
  | CancelLikeSuccess
  | CancelLikeFailure;
