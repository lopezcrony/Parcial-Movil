import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ProductEntity } from '../products.entity';
import {
	CreateProductDataI,
	IProductsRepository,
	UpdateProductDataI,
} from './products.repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly repository: Repository<ProductEntity>,
	) {}

	create(data: CreateProductDataI): Promise<ProductEntity> {
		return this.repository.save(this.repository.create(data));
	}

	async update(id: number, data: UpdateProductDataI): Promise<ProductEntity> {
		const product = await this.repository.findOne({ where: { id } });

		if (!product) {
			throw new NotFoundException('Producto no encontrado');
		}

		const definedData = Object.fromEntries(
			Object.entries(data).filter(([, value]) => value !== undefined),
		);
		Object.assign(product, definedData);
		return this.repository.save(product);
	}

	findAll(): Promise<ProductEntity[]> {
		return this.repository.find({ order: { nombre: 'ASC' } });
	}

	findAvailable(): Promise<ProductEntity[]> {
		return this.repository.find({
			where: { activo: true, stock: MoreThan(0) },
			order: { nombre: 'ASC' },
		});
	}

	findById(id: number): Promise<ProductEntity | null> {
		return this.repository.findOne({ where: { id } });
	}

	findByName(nombre: string): Promise<ProductEntity[]> {
		return this.repository
			.createQueryBuilder('product')
			.where('LOWER(product.nombre) LIKE LOWER(:nombre)', {
				nombre: `%${nombre}%`,
			})
			.getMany();
	}

}
