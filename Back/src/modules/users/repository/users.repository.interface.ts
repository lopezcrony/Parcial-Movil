import { UserEntity, UserRole, UserStatus } from '../users.entity';

export interface CreateUserDataI {
	nombre?: string;
	apellido?: string;
	email: string;
	password: string;
	rol?: UserRole;
	estado?: UserStatus;
}

export interface UpdateUserProfileDataI {
	nombre: string;
	apellido: string;
	tipoDocumento: string;
	numeroDocumento: string;
	email?: string;
	telefono?: string | null;
	direccion?: string | null;
}

export interface IUsersRepository {
	create(data: CreateUserDataI): Promise<UserEntity>;
	findById(id: number): Promise<UserEntity | null>;
	findByEmail(email: string): Promise<UserEntity | null>;
	findByStatus(status: UserStatus): Promise<UserEntity[]>;
	findByRole(role: UserRole): Promise<UserEntity[]>;
	activateUser(id: number, rol: UserRole): Promise<UserEntity>;
	updateProfile(
		id: number,
		data: UpdateUserProfileDataI,
	): Promise<UserEntity>;
}

export const IUsersRepositoryToken = Symbol('IUsersRepository');
