import { Type } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsOptional()
	@IsString()
	descripcion?: string;

	@Type(() => Number)
	@IsNumber()
	@Min(0.01)
	precio: number;

	@Type(() => Number)
	@IsInt()
	@Min(0)
	stock: number;
}