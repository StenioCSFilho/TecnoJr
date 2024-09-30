/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule.registerAsync({ 
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('SECRET_KEY'),
      signOptions: { expiresIn: '1d'},
    }),
    global: true,
    inject: [ConfigService],
   }),
   UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
