import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IProductsRepositoryToken } from '../products/repository/products.repository.interface';
import type { IProductsRepository } from '../products/repository/products.repository.interface';
import { IUsersRepositoryToken } from '../users/repository/users.repository.interface';
import type { IUsersRepository } from '../users/repository/users.repository.interface';
import { UserStatus } from '../users/users.entity';
import { UserRole } from '../users/users.entity';
import { ISalesRepositoryToken } from './repository/sales.repository.interface';
import type {
	CreateSaleDetailDataI,
	ISalesRepository,
} from './repository/sales.repository.interface';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
	constructor(
		@Inject(ISalesRepositoryToken)
		private readonly salesRepository: ISalesRepository,
		@Inject(IProductsRepositoryToken)
		private readonly productsRepository: IProductsRepository,
		@Inject(IUsersRepositoryToken)
		private readonly usersRepository: IUsersRepository,
	) {}

	async create(userId: number, data: CreateSaleDto) {
		const buyer = await this.usersRepository.findById(userId);

		if (!buyer) {
			throw new NotFoundException('Usuario comprador no encontrado');
		}

		if (buyer.estado !== UserStatus.ACTIVE) {
			throw new BadRequestException('El usuario comprador no está activo');
		}

		if (!buyer.perfilCompleto) {
			throw new BadRequestException(
				'El usuario comprador debe completar su información personal',
			);
		}

		if (data.detalles.length === 0) {
			throw new BadRequestException('La venta debe tener al menos un detalle');
		}

		const details: CreateSaleDetailDataI[] = [];

		for (const item of data.detalles) {
			if (item.cantidad <= 0) {
				throw new BadRequestException('La cantidad del producto debe ser mayor que cero');
			}

			const product = await this.productsRepository.findById(item.idProducto);

			if (!product) {
				throw new NotFoundException('Producto no encontrado');
			}

			if (!product.activo) {
				throw new BadRequestException('El producto no está activo');
			}

			if (product.stock < item.cantidad) {
				throw new BadRequestException('Stock insuficiente para el producto');
			}

			const precioUnitario = Number(product.precio);
			const subtotal = precioUnitario * item.cantidad;

			details.push({
				idProducto: item.idProducto,
				cantidad: item.cantidad,
				precioUnitario,
				subtotal,
			});
		}

		const total = details.reduce((sum, detail) => sum + detail.subtotal, 0);
		const sale = await this.salesRepository.createWithDetails(
			{
			idUsuario: userId,
			total,
			},
			details,
		);

		return this.salesRepository.findByIdWithDetails(sale.id);
	}

	findAll(userId: number, role: UserRole) {
		return role === UserRole.ADMIN
			? this.salesRepository.findAll()
			: this.salesRepository.findByUser(userId);
	}

	async findById(id: number, userId: number, role: UserRole) {
		const sale = await this.salesRepository.findByIdWithDetails(id);

		if (!sale) {
			throw new NotFoundException('Venta no encontrada');
		}

		if (role !== UserRole.ADMIN && sale.usuario.id !== userId) {
			throw new NotFoundException('Venta no encontrada');
		}

		return sale;
	}


}
