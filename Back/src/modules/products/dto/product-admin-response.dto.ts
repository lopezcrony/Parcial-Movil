import { ProductEntity } from '../products.entity';

export class ProductAdminResponseDto {
	id: number;
	nombre: string;
	descripcion: string | null;
	precio: number;
	stock: number;
	activo: boolean;

	constructor(product: ProductEntity) {
		this.id = product.id;
		this.nombre = product.nombre;
		this.descripcion = product.descripcion;
		this.precio = Number(product.precio);
		this.stock = product.stock;
		this.activo = product.activo;
	}
}