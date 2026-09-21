import {
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IProductsRepositoryToken } from './repository/products.repository.interface';
import type { IProductsRepository } from './repository/products.repository.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
	constructor(
		@Inject(IProductsRepositoryToken)
		private readonly productsRepository: IProductsRepository,
	) {}

	async create(data: CreateProductDto) {
		const productExists = await this.productsRepository.findByName(data.nombre);

		if (productExists.length > 0) {
			throw new ConflictException('El nombre del producto ya está registrado');
		}

		return this.productsRepository.create({
			nombre: data.nombre,
			descripcion: data.descripcion,
			precio: data.precio,
			stock: data.stock,
		});
	}

	async update(id: number, data: UpdateProductDto) {
		const product = await this.productsRepository.findById(id);

		if (!product) {
			throw new NotFoundException('Producto no encontrado');
		}

		if (data.nombre && data.nombre.toLowerCase() !== product.nombre.toLowerCase()) {
			const productsWithName = await this.productsRepository.findByName(data.nombre);
			const duplicate = productsWithName.find(
				(item) =>
					item.id !== id &&
					item.nombre.toLowerCase() === data.nombre?.toLowerCase(),
			);

			if (duplicate) {
				throw new ConflictException('El nombre del producto ya está registrado');
			}
		}

		return this.productsRepository.update(id, {
			nombre: data.nombre,
			descripcion: data.descripcion,
			precio: data.precio,
			stock: data.stock,
			activo: data.activo,
		});
	}

	findAll() {
		return this.productsRepository.findAll();
	}

	findAvailable() {
		return this.productsRepository.findAvailable();
	}
}
