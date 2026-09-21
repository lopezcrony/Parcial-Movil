import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { SalesController } from './sales.controller';
import { SaleDetailEntity } from './entities/sale-detail.entity';
import { SaleEntity } from './entities/sales.entity';
import { SalesRepository } from './repository/sales.repository';
import { ISalesRepositoryToken } from './repository/sales.repository.interface';
import { SalesService } from './sales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleEntity, SaleDetailEntity]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [SalesController],
  providers: [
    SalesService,
    JwtAuthGuard,
    {
      provide: ISalesRepositoryToken,
      useClass: SalesRepository,
    },
  ],
  exports: [ISalesRepositoryToken],
})
export class SalesModule {}
