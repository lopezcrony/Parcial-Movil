import { ProductEntity } from '../products.entity';

export interface CreateProductDataI {
	nombre: string;
	descripcion?: string | null;
	precio: number;
	stock: number;
}

export interface UpdateProductDataI {
	nombre?: string;
	descripcion?: string | null;
	precio?: number;
	stock?: number;
	activo?: boolean;
}

export interface IProductsRepository {
	create(data: CreateProductDataI): Promise<ProductEntity>;
	update(id: number, data: UpdateProductDataI): Promise<ProductEntity>;
	findAll(): Promise<ProductEntity[]>;
	findAvailable(): Promise<ProductEntity[]>;
	findById(id: number): Promise<ProductEntity | null>;
	findByName(name: string): Promise<ProductEntity[]>;
}

export const IProductsRepositoryToken = Symbol('IProductsRepository');
