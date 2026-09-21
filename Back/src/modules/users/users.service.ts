import {
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
	OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUsersRepositoryToken } from './repository/users.repository.interface';
import type { IUsersRepository } from './repository/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { UserRole, UserStatus } from './users.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UsersService implements OnModuleInit {
	constructor(
		@Inject(IUsersRepositoryToken)
		private readonly usersRepository: IUsersRepository,
	) {}

	async onModuleInit() {
		const email = process.env.ADMIN_EMAIL ?? 'admin@tienda.local';
		const rawPassword = process.env.ADMIN_PASSWORD ?? 'Admin1234!';
		const adminExists = await this.usersRepository.findByEmail(email);

		if (adminExists) {
			return;
		}

		await this.usersRepository.create({
			nombre: 'Administrador',
			email,
			password: await bcrypt.hash(rawPassword, 10),
			rol: UserRole.ADMIN,
			estado: UserStatus.ACTIVE,
		});
	}

	async create(data: CreateUserDto) {
		const userExists = await this.usersRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictException('El correo ya está registrado');
		}

		return this.usersRepository.create({
			email: data.email,
			password: data.password,
			estado: UserStatus.PENDING,
			rol: UserRole.CLIENT,
		});
	}

	findPending() {
		return this.usersRepository.findByStatus(UserStatus.PENDING);
	}

	async findProfile(id: number) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new NotFoundException('Usuario no encontrado');
		}

		return user;
	}

	async findClients() {
		const users = await this.usersRepository.findByRole(UserRole.CLIENT);
		return users.filter((user) => user.estado === UserStatus.ACTIVE);
	}

	async activate(id: number, data: ActivateUserDto) {
		const userExists = await this.usersRepository.findById(id);

		if (!userExists) {
			throw new NotFoundException('Usuario no encontrado');
		}

		if (userExists.estado !== UserStatus.PENDING) {
			throw new ConflictException('El usuario no está pendiente de activación');
		}

		return this.usersRepository.activateUser(id, data.rol);
	}

	async updateProfile(id: number, data: UpdateUserProfileDto) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new NotFoundException('Usuario no encontrado');
		}

		if (user.estado !== UserStatus.ACTIVE) {
			throw new ConflictException('El usuario aún no está activo');
		}

		if (data.email && data.email !== user.email) {
			const emailExists = await this.usersRepository.findByEmail(data.email);

			if (emailExists && emailExists.id !== id) {
				throw new ConflictException('El correo ya está registrado');
			}
		}

		return this.usersRepository.updateProfile(id, data);
	}
}
