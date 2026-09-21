import { SaleDetailEntity } from '../entities/sale-detail.entity';

export class SaleDetailResponseDto {
	id: number;
	cantidad: number;
	precioUnitario: number;
	subtotal: number;
	producto: {
		id: number;
		nombre: string;
	};

	constructor(detail: SaleDetailEntity) {
		this.id = detail.id;
		this.cantidad = detail.cantidad;
		this.precioUnitario = Number(detail.precioUnitario);
		this.subtotal = Number(detail.subtotal);
		this.producto = {
			id: detail.producto.id,
			nombre: detail.producto.nombre,
		};
	}
}