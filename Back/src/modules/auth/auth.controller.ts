import { Body, Controller, Post } from '@nestjs/common';
import { handleControllerError } from '../../common/errors/handle-controller-error';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() data: CreateUserDto) {
		try {
			const user = await this.authService.register(data);
			return {
				message: 'Registro exitoso. Tu cuenta está pendiente de aprobación.',
				user: {
					id: user.id,
					email: user.email,
					estado: user.estado,
				},
			};
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Post('login')
	async login(@Body() data: LoginDto) {
		try {
			const result = await this.authService.login(data);
			return new AuthResponseDto(result.accessToken, result.user);
		} catch (error) {
			return handleControllerError(error);
		}
	}
}
