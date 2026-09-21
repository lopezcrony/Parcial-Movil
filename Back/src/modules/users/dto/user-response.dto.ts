import { UserEntity, UserRole, UserStatus } from '../users.entity';

export class UserResponseDto {
	id: number;
	nombre: string | null;
	apellido: string | null;
	email: string;
	rol: UserRole;
	estado: UserStatus;
	perfilCompleto: boolean;

	constructor(user: UserEntity) {
		this.id = user.id;
		this.nombre = user.nombre;
		this.apellido = user.apellido;
		this.email = user.email;
		this.rol = user.rol;
		this.estado = user.estado;
		this.perfilCompleto = user.perfilCompleto;
	}
}