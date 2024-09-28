import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { IUserRepository } from './IUser.repository';
import { DB_USER_NAME } from '../../shared/constans/DB_USER_NAME';
import { Repository } from 'typeorm';

export class UserTypeORMRepository implements IUserRepository {
  constructor(
    @InjectRepository(User, DB_USER_NAME)
    private usersRepository: Repository<User>
  ) {}

  async findOneBy(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }
}
