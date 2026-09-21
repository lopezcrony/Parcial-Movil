import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../users/users.entity';
import { handleControllerError } from '../../common/errors/handle-controller-error';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { SalesService } from './sales.service';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
	constructor(private readonly salesService: SalesService) {}

	@Post()
	async create(@Req() request: any, @Body() data: CreateSaleDto) {
		try {
			const sale = await this.salesService.create(request.user.sub, data);
			return sale ? new SaleResponseDto(sale) : null;
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get()
	async findAll(@Req() request: any) {
		try {
			const sales = await this.salesService.findAll(
				request.user.sub,
				request.user.rol as UserRole,
			);
			return sales.map((sale) => new SaleResponseDto(sale));
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get(':id')
	async findById(@Req() request: any, @Param('id', ParseIntPipe) id: number) {
		try {
			return new SaleResponseDto(
				await this.salesService.findById(
					id,
					request.user.sub,
					request.user.rol as UserRole,
				),
			);
		} catch (error) {
			return handleControllerError(error);
		}
	}
}
