import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../../common/guards/admin.guard';
import { handleControllerError } from '../../common/errors/handle-controller-error';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductAdminResponseDto } from './dto/product-admin-response.dto';
import { ProductAvailableResponseDto } from './dto/product-available-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(AdminGuard)
	async create(@Body() data: CreateProductDto) {
		try {
			return new ProductAdminResponseDto(await this.productsService.create(data));
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Patch(':id')
	@UseGuards(AdminGuard)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateProductDto,
	) {
		try {
			const product = await this.productsService.update(id, data);
			return new ProductAdminResponseDto(product);
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get()
	async findAvailable() {
		try {
			const products = await this.productsService.findAvailable();
			return products.map(
				(product) => new ProductAvailableResponseDto(product),
			);
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get('all')
	@UseGuards(AdminGuard)
	async findAll() {
		try {
			const products = await this.productsService.findAll();
			return products.map((product) => new ProductAdminResponseDto(product));
		} catch (error) {
			return handleControllerError(error);
		}
	}
}
