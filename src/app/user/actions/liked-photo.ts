import { Photo } from '../../photo/models/photo';
import { Action } from '@ngrx/store';

export enum UserLikedPhotoActionTypes {
  NextPage = '[User Liked Photo] Next Page',
  PrevPage = '[User Liked Photo] Prev Page',
  Sort = '[User Liked Photo] Sort',
}

export class NextPage implements Action {
  readonly type = UserLikedPhotoActionTypes.NextPage;

  constructor(public payload: string) {}
}

export class PrevPage implements Action {
  readonly type = UserLikedPhotoActionTypes.PrevPage;

  constructor(public payload: string) {}
}

export class Sort implements Action {
  readonly type = UserLikedPhotoActionTypes.Sort;

  constructor(
    public payload: {
      id: string;
      sortColumn: string;
      sortOrder: 'ASC' | 'DESC';
    },
  ) {}
}

export type UserLikedPhotoActions = NextPage | PrevPage | Sort;
