import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => config.get('cache'),
          inject: [ConfigService],
        }),
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => config.get('http'),
          inject: [ConfigService],
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return list of places', async () => {
      expect((await appController.findAll()).length).toBe(2);
    });

    it('should return filtered list of places', async () => {
      expect((await appController.findAll('casa')).length).toBe(1);
    });

    it('should return single place', async () => {
      const place = await appController.findOne('GXvPAor1ifNfpF0U5PTG0w');
      expect(place.id).toBe('GXvPAor1ifNfpF0U5PTG0w');
      expect(place.openingHours).toMatchObject({
        'monday - friday': '11:30 - 14:00,18:30 - 22:00',
      });
    });
  });
});
