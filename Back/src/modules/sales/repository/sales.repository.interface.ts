import { SaleDetailEntity } from '../entities/sale-detail.entity';
import { SaleEntity } from '../entities/sales.entity';

export interface CreateSaleDataI {
	idUsuario: number;
	fecha?: Date;
	total: number;
}

export interface CreateSaleDetailDataI {
	idProducto: number;
	cantidad: number;
	precioUnitario: number;
	subtotal: number;
}

export interface ISalesRepository {
	createWithDetails(
		data: CreateSaleDataI,
		details: CreateSaleDetailDataI[],
	): Promise<SaleEntity>;
	findAll(): Promise<SaleEntity[]>;
	findByUser(userId: number): Promise<SaleEntity[]>;
	findByIdWithDetails(id: number): Promise<SaleEntity | null>;
}

export const ISalesRepositoryToken = Symbol('ISalesRepository');
