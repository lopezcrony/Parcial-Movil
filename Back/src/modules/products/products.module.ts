import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from '../../common/guards/admin.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './products.entity';
import { ProductsRepository } from './repository/products.repository';
import { IProductsRepositoryToken } from './repository/products.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    JwtAuthGuard,
    AdminGuard,
    {
      provide: IProductsRepositoryToken,
      useClass: ProductsRepository,
    },
  ],
  exports: [IProductsRepositoryToken],
})
export class ProductsModule {}
