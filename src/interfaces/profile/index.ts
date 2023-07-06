import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProfileInterface {
  id?: string;
  bio?: string;
  image?: string;
  contact_info?: string;
  website?: string;
  social_links?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  bio?: string;
  image?: string;
  contact_info?: string;
  website?: string;
  social_links?: string;
  user_id?: string;
}
