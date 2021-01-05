import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth/',
      realm: 'TestRealm',
      clientId: 'testclient',
      secret: 'e764e043-21d4-4da6-837a-4ebcc1d98b3d'
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
