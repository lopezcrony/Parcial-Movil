import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from '../modules/products/products.entity';
import { SaleDetailEntity } from '../modules/sales/entities/sale-detail.entity';
import { SaleEntity } from '../modules/sales/entities/sales.entity';
import { UserEntity } from '../modules/users/users.entity';

export const getDatabaseConfig = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: 'postgres',
	url: configService.getOrThrow<string>('DATABASE_URL'),
	entities: [UserEntity, ProductEntity, SaleEntity, SaleDetailEntity],
	synchronize: true,
});
