import { IsEnum } from 'class-validator';
import { UserRole } from '../users.entity';

export class ActivateUserDto {
	@IsEnum(UserRole)
	rol: UserRole;
}