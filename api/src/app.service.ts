import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, zip } from 'rxjs';
import { Days, defaultDays, defaultHour, Place } from './place.type';
import { PlaceDto } from './place.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  async findAll(): Promise<PlaceDto[]> {
    return lastValueFrom(
      zip(
        this.config.get('api.places').map((place: string) =>
          this.http.get<Place>(place).pipe(
            map(({ data }) => ({
              id: data.local_entry_id,
              name: data.displayed_what,
              address: data.displayed_where,
            })),
          ),
        ),
      ),
    );
  }

  async findOne(id: string): Promise<PlaceDto | undefined> {
    const place = this.config
      .get('api.places')
      .find((url: string) => url.includes(id));

    return (
      place &&
      lastValueFrom(
        this.http.get<Place>(place).pipe(
          map(({ data }) => ({
            id: data.local_entry_id,
            name: data.displayed_what,
            address: data.displayed_where,
            openingHours: this.groupDays(data.opening_hours.days),
          })),
        ),
      )
    );
  }

  groupDays(days: Days) {
    // Order & Format all days in week with hours
    const data = Object.entries(days).reduce(
      (result, [day, hours]) => ({
        ...result,
        [day]:
          hours.map((hour) => `${hour.start} - ${hour.end}`).join() ||
          defaultHour,
      }),
      defaultDays,
    );
    // Group days with same hours
    return Object.entries(data).reduce((result, [day, hours]) => {
      const latestDay = Object.keys(result).pop();
      if (result[latestDay] === data[day]) {
        result[`${latestDay.split(' - ')[0]} - ${day}`] = hours;
        delete result[latestDay];
        return result;
      }
      result[day] = hours;
      return result;
    }, {});
  }
}
