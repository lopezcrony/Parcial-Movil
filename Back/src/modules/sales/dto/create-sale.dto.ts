import { Type } from 'class-transformer';
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	Min,
	ValidateNested,
} from 'class-validator';
import { CreateSaleDetailDto } from './create-sale-detail.dto';

export class CreateSaleDto {
	@IsArray()
	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => CreateSaleDetailDto)
	detalles: CreateSaleDetailDto[];
}