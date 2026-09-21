import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from '../../common/guards/admin.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { UsersRepository } from './repository/users.repository';
import { IUsersRepositoryToken } from './repository/users.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'clave-secreta-desarrollo',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtAuthGuard,
    AdminGuard,
    {
      provide: IUsersRepositoryToken,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepositoryToken],
})
export class UsersModule {}
