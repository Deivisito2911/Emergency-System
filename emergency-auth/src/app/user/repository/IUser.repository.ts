import { User } from '../entities/user';

export interface IUserRepository {
  findOneBy(username: string): Promise<User | undefined>;
}

export const User_Repository_PROVIDER_NAME = 'IUserRepository';
