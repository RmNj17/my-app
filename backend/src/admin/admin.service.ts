import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { VerificationStatus } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async getPendingGuides() {
    return this.usersService.findPendingGuides();
  }

  async verifyGuide(guideId: string, status: VerificationStatus) {
    const guide = await this.usersService.findOne(guideId);

    if (!guide) {
      throw new NotFoundException('Guide not found');
    }

    return this.usersService.updateVerificationStatus(guideId, status);
  }
}
