import { User } from '../../auth/models/user';
import { Period } from './period';

export interface PhotoFromApi {
  id: number;
  createTime: string;
  title: string;
  imgLink: string;
  like: number;
  user: User;
}

export interface Photo extends PhotoFromApi {
  period: Period;
}
