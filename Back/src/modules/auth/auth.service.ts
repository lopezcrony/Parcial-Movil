import {
	ConflictException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IUsersRepositoryToken } from '../users/repository/users.repository.interface';
import type { IUsersRepository } from '../users/repository/users.repository.interface';
import { UserRole, UserStatus } from '../users/users.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		@Inject(IUsersRepositoryToken)
		private readonly usersRepository: IUsersRepository,
		private readonly jwtService: JwtService,
	) {}

	async register(data: CreateUserDto) {
		const userExists = await this.usersRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictException('El correo ya está registrado');
		}

		const password = await bcrypt.hash(data.password, 10);

		return this.usersRepository.create({
			email: data.email,
			password,
			rol: UserRole.CLIENT,
			estado: UserStatus.PENDING,
		});
	}

	async login(data: LoginDto) {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user || !(await bcrypt.compare(data.password, user.password))) {
			throw new UnauthorizedException('Correo o contraseña incorrectos');
		}

		if (user.estado !== UserStatus.ACTIVE) {
			throw new UnauthorizedException(
				'La cuenta aún no ha sido activada por un administrador',
			);
		}

		const accessToken = await this.jwtService.signAsync({
			sub: user.id,
			rol: user.rol,
		});

		return {
			accessToken,
			user: {
				id: user.id,
				email: user.email,
				rol: user.rol,
				estado: user.estado,
				perfilCompleto: user.perfilCompleto,
			},
		};
	}
}
