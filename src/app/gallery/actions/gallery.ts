import { Action } from '@ngrx/store';

export enum GalleryActionTypes {
  NextPage = '[Gallery] Next Page',
  PrevPage = '[Gallery] Prev Page',
}

export class NextPage implements Action {
  readonly type = GalleryActionTypes.NextPage;
}

export class PrevPage implements Action {
  readonly type = GalleryActionTypes.PrevPage;
}

export type GalleryActions = NextPage | PrevPage;
