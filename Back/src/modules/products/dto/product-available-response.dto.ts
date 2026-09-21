import { ProductEntity } from '../products.entity';

export class ProductAvailableResponseDto {
	id: number;
	nombre: string;
	descripcion: string | null;
	precio: number;
	stock: number;

	constructor(product: ProductEntity) {
		this.id = product.id;
		this.nombre = product.nombre;
		this.descripcion = product.descripcion;
		this.precio = Number(product.precio);
		this.stock = product.stock;
	}
}