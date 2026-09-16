import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [UsersModule, ProductsModule, SalesModule],
  controllers: [ AuthController],
  providers: [ AuthService],
})
export class AppModule {}
