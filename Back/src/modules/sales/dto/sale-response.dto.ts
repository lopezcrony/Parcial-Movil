import { SaleEntity } from '../entities/sales.entity';
import { SaleDetailResponseDto } from './sale-detail-response.dto';

export class SaleResponseDto {
	id: number;
	fecha: Date;
	total: number;
	usuario: {
		id: number;
		nombre: string | null;
	};
	detalles: SaleDetailResponseDto[];

	constructor(sale: SaleEntity) {
		this.id = sale.id;
		this.fecha = sale.fecha;
		this.total = Number(sale.total);
		this.usuario = {
			id: sale.usuario.id,
			nombre: sale.usuario.nombre,
		};
		this.detalles = (sale.detalles ?? []).map(
			(detail) => new SaleDetailResponseDto(detail),
		);
	}
}