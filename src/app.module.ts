import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        
        // --- This is for migrations ---
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_history', // table to track migrations
      }),
    }),

    UsersModule,
    ProductModule,
    TransactionsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
