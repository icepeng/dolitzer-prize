import { User } from '../../user/models/user';

export interface Photo {
  id: number;
  createTime: string;
  title: string;
  imgLink: string;
  like: number;
  user: User;
}
