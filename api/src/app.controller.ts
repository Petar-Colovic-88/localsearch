import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
  CacheInterceptor,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { PlaceDto } from './place.dto';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  @Get()
  async findAll(@Query('search') search?: string): Promise<PlaceDto[]> {
    // All controller actions are cached (with query params) and additionally cached API call
    const places =
      (await this.cacheManager.get<PlaceDto[]>('places')) ||
      (await this.cacheManager.set<PlaceDto[]>(
        'places',
        await this.appService.findAll(),
        { ttl: 10 }, // Optional longer cache for API call
      ));

    return search
      ? places.filter(
          ({ name, address }) =>
            name.toLowerCase().startsWith(search.toLowerCase()) ||
            address.toLowerCase().startsWith(search.toLowerCase()),
        )
      : places;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlaceDto | undefined> {
    return this.appService.findOne(id);
  }
}
