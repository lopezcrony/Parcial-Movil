import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
	CreateUserDataI,
	IUsersRepository,
	UpdateUserProfileDataI,
} from './users.repository.interface';
import { UserEntity, UserRole, UserStatus } from '../users.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	async create(data: CreateUserDataI): Promise<UserEntity> {
		const user = this.repository.create({
			...data,
			rol: data.rol ?? UserRole.CLIENT,
		});

		return this.repository.save(user);
	}

	findById(id: number): Promise<UserEntity | null> {
		return this.repository.findOne({ where: { id } });
	}

	findByEmail(email: string): Promise<UserEntity | null> {
		return this.repository.findOne({ where: { email } });
	}

	findByStatus(status: UserStatus): Promise<UserEntity[]> {
		return this.repository.find({ where: { estado: status } });
	}

	findByRole(role: UserRole): Promise<UserEntity[]> {
		return this.repository.find({ where: { rol: role } });
	}

	private updateStatus(
		id: number,
		estado: UserStatus,
		rol?: UserRole,
	): Promise<UserEntity> {
		return this.repository.save({ id, estado, rol });
	}

	activateUser(id: number, rol: UserRole): Promise<UserEntity> {
		return this.updateStatus(id, UserStatus.ACTIVE, rol);
	}

	updateProfile(
		id: number,
		data: UpdateUserProfileDataI,
	): Promise<UserEntity> {
		return this.repository.save({ id, ...data, perfilCompleto: true });
	}
}
