import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../../products/products.entity';
import { UserEntity } from '../../users/users.entity';
import { SaleDetailEntity } from '../entities/sale-detail.entity';
import { SaleEntity } from '../entities/sales.entity';
import {
	CreateSaleDataI,
	CreateSaleDetailDataI,
	ISalesRepository,
} from './sales.repository.interface';

@Injectable()
export class SalesRepository implements ISalesRepository {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly salesRepository: Repository<SaleEntity>,
		private readonly dataSource: DataSource,
	) {}

	createWithDetails(
		data: CreateSaleDataI,
		details: CreateSaleDetailDataI[],
	): Promise<SaleEntity> {
		return this.dataSource.transaction(async (manager) => {
			const saleRepository = manager.getRepository(SaleEntity);
			const detailRepository = manager.getRepository(SaleDetailEntity);
			const productRepository = manager.getRepository(ProductEntity);

			const sale = saleRepository.create({
				fecha: data.fecha,
				total: data.total,
				usuario: { id: data.idUsuario } as UserEntity,
			});
			const savedSale = await saleRepository.save(sale);

			for (const datail of details) {
				const product = await productRepository.findOne({
					where: { id: datail.idProducto },
					lock: { mode: 'pessimistic_write' },
				});

				if (!product) {
					throw new NotFoundException('Producto no encontrado');
				}

				if (!product.activo) {
					throw new BadRequestException('El producto no está activo');
				}

				if (product.stock < datail.cantidad) {
					throw new BadRequestException(
						'Stock insuficiente para el producto',
					);
				}

				product.stock -= datail.cantidad;
				await productRepository.save(product);
				await detailRepository.save(
					detailRepository.create({
						venta: savedSale,
						producto: product,
						cantidad: datail.cantidad,
						precioUnitario: datail.precioUnitario,
						subtotal: datail.subtotal,
					}),
				);
			}

			return savedSale;
		});
	}

	findAll(): Promise<SaleEntity[]> {
		return this.salesRepository.find({
			relations: {
				usuario: true,
				detalles: {
					producto: true,
				},
			},
		});
	}

	findByUser(userId: number): Promise<SaleEntity[]> {
		return this.salesRepository.find({
			where: { usuario: { id: userId } },
			relations: {
				usuario: true,
				detalles: {
					producto: true,
				},
			},
		});
	}

	findByIdWithDetails(id: number): Promise<SaleEntity | null> {
		return this.salesRepository.findOne({
			where: { id },
			relations: {
				usuario: true,
				detalles: {
					producto: true,
				},
			},
		});
	}

}
