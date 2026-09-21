import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { SaleDetailEntity } from '../sales/entities/sale-detail.entity';

@Entity('products')
export class ProductEntity {
	@PrimaryGeneratedColumn('identity')
	id: number;

	@Column({ length: 120 })
	nombre: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	descripcion: string | null;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	precio: number;

	@Column({ type: 'int', default: 0 })
	stock: number;

	@Column({ default: true })
	activo: boolean;

	@OneToMany(() => SaleDetailEntity, (detail) => detail.producto)
	detallesVenta: SaleDetailEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
