import { UserRole, UserStatus } from '../../users/users.entity';

export class AuthResponseDto {
	accessToken: string;
	user: {
		id: number;
		email: string;
		rol: UserRole;
		estado: UserStatus;
		perfilCompleto: boolean;
	};

	constructor(accessToken: string, user: AuthResponseDto['user']) {
		this.accessToken = accessToken;
		this.user = user;
	}
}