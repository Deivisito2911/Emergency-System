import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { IUserRepository, User_Repository_PROVIDER_NAME } from './repository/IUser.repository';
@Injectable()
export class UserService {
  constructor(
    @Inject(User_Repository_PROVIDER_NAME)
    private usersRepository: IUserRepository
  ) {}

  async findOneBy(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy(username);
  }
}
