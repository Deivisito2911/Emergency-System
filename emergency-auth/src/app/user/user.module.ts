import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { DB_USER_NAME } from '../shared/constans/DB_USER_NAME';
import { UserTypeORMRepository } from './repository/User-TypeORM.repository';
import { IUserRepository, User_Repository_PROVIDER_NAME } from './repository/IUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User], DB_USER_NAME)],
  providers: [UserService, {
    useClass: UserTypeORMRepository,
    provide: User_Repository_PROVIDER_NAME,
  }],
  exports: [UserService],
})
export class UserModule {}
