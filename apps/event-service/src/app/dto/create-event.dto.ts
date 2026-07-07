import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateTicketTierDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(1)
  totalQuantity!: number;
}

export class CreateEventDto {
  @IsString()
  name!: string;

  @IsString()
  venue!: string;

  @IsDateString()
  startsAt!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketTierDto)
  tiers!: CreateTicketTierDto[];
}
