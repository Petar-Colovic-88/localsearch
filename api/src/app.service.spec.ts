import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('StoreService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        CacheModule.register({}),
        HttpModule.register({}),
      ],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should groupDays opening hours for wednesday - friday', () => {
    const days = service.groupDays({
      monday: [],
      tuesday: [],
      wednesday: [{ start: 'TERMIN1', end: 'TERMIN2' }],
      thursday: [{ start: 'TERMIN1', end: 'TERMIN2' }],
      friday: [{ start: 'TERMIN1', end: 'TERMIN2' }],
      saturday: [],
      sunday: [],
    });

    expect(days).toMatchObject({ 'wednesday - friday': 'TERMIN1 - TERMIN2' });
  });

  it('should not groupDays opening hours for skipped in between day', () => {
    const days = service.groupDays({
      monday: [],
      tuesday: [
        { start: 'TERMIN1', end: 'TERMIN2' },
        { start: 'TERMIN3', end: 'TERMIN4' },
      ],
      wednesday: [],
      thursday: [
        { start: 'TERMIN1', end: 'TERMIN2' },
        { start: 'TERMIN3', end: 'TERMIN4' },
      ],
      friday: [
        { start: 'TERMIN1', end: 'TERMIN2' },
        { start: 'TERMIN3', end: 'TERMIN4' },
      ],
      saturday: [],
      sunday: [],
    });

    expect(days).toMatchObject({
      tuesday: 'TERMIN1 - TERMIN2,TERMIN3 - TERMIN4',
      'thursday - friday': 'TERMIN1 - TERMIN2,TERMIN3 - TERMIN4',
      'saturday - sunday': 'Closed',
    });
  });
});
