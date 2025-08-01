import { IsNotEmpty, IsUUID, IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  guideId!: string;

  @IsDateString()
  date!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
