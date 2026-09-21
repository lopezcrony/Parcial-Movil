import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/users.entity';
import { SaleDetailEntity } from './sale-detail.entity';

@Entity('sales')
export class SaleEntity {
	@PrimaryGeneratedColumn('identity')
	id: number;

	@ManyToOne(() => UserEntity, (user) => user.ventas, {
		nullable: false,
		onUpdate: 'CASCADE',
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'idUsuario' })
	usuario: UserEntity;

	@CreateDateColumn()
	fecha: Date;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	total: number;

	@OneToMany(() => SaleDetailEntity, (detail) => detail.venta, {
		cascade: true,
	})
	detalles: SaleDetailEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
