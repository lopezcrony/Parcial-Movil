import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';

export class UpdateProductDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	nombre?: string;

	@IsOptional()
	@IsString()
	descripcion?: string;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0.01)
	precio?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	stock?: number;

	@IsOptional()
	@IsBoolean()
	activo?: boolean;
}