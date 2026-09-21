import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { SaleEntity } from '../sales/entities/sales.entity';

export enum UserRole {
	ADMIN = 'ADMIN',
	CLIENT = 'CLIENT',
}

export enum UserStatus {
	PENDING = 'PENDING',
	ACTIVE = 'ACTIVE',
	REJECTED = 'REJECTED',
}

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('identity')
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: true })
	nombre: string | null;

	@Column({ type: 'varchar', length: 100, nullable: true })
	apellido: string | null;

	@Column({ length: 150, unique: true })
	email: string;

	@Column({ length: 255 })
	password: string;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
	rol: UserRole;

	@Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
	estado: UserStatus;

	@Column({ type: 'varchar', length: 20, nullable: true })
	tipoDocumento: string | null;

	@Column({ type: 'varchar', length: 30, unique: true, nullable: true })
	numeroDocumento: string | null;

	@Column({ type: 'varchar', length: 20, nullable: true })
	telefono: string | null;

	@Column({ type: 'varchar', length: 255, nullable: true })
	direccion: string | null;

	@Column({ default: false })
	perfilCompleto: boolean;

	@OneToMany(() => SaleEntity, (sale) => sale.usuario)
	ventas: SaleEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
