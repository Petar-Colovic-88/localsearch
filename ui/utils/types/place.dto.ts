export class PlaceDto {
  id!: string;

  name!: string;

  address!: string;

  website?: string;

  phoneNumber?: string;

  openingHours?: { [key: string]: string };
}
