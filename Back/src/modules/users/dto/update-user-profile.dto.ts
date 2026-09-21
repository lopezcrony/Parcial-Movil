import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class UpdateUserProfileDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsString()
	@IsNotEmpty()
	apellido: string;

	@IsString()
	@IsNotEmpty()
	tipoDocumento: string;

	@IsString()
	@IsNotEmpty()
	numeroDocumento: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	telefono?: string;

	@IsOptional()
	@IsString()
	direccion?: string;
}