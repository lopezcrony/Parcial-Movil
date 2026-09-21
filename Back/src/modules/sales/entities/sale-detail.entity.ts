import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/products.entity';
import { SaleEntity } from './sales.entity';

@Entity('sale_details')
export class SaleDetailEntity {
	@PrimaryGeneratedColumn('identity')
	id: number;

	@ManyToOne(() => SaleEntity, (sale) => sale.detalles, {
		nullable: false,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'idVenta' })
	venta: SaleEntity;

	@ManyToOne(() => ProductEntity, (product) => product.detallesVenta, {
		nullable: false,
		onUpdate: 'CASCADE',
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'idProducto' })
	producto: ProductEntity;

	@Column({ type: 'int' })
	cantidad: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	precioUnitario: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	subtotal: number;
}
