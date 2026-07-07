import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  eventId!: string;

  @IsUUID()
  tierId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
