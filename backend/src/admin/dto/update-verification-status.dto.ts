import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from '../../users/entities/user.entity';

export class UpdateVerificationStatusDto {
  @IsNotEmpty()
  @IsEnum(VerificationStatus)
  status: VerificationStatus;
}
