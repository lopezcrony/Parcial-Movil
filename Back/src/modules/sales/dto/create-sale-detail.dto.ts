import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateSaleDetailDto {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	idProducto: number;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	cantidad: number;
}