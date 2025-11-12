import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available everywhere
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
        
        entities: [__dirname + '/../**/*.entity.{js,ts}'], // Find all .entity files
        synchronize: false,
        
        // --- This is for migrations ---
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_history', // table to track migrations
      }),
    }),

    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
