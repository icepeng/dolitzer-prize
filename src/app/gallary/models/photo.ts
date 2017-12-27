import { User } from '../../auth/models/user';

export interface Photo {
  id: number;
  title: string;
  imgLink: string;
  like: number;
  user: User;
}
