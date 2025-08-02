import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateVerificationStatusDto } from './dto/update-verification-status.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('admin')
// @UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('guides/pending')
  getPendingGuides() {
    return this.adminService.getPendingGuides();
  }

  @Patch('guides/:id/verify')
  verifyGuide(
    @Param('id') id: string,
    @Body() updateDto: UpdateVerificationStatusDto,
  ) {
    return this.adminService.verifyGuide(id, updateDto.status);
  }
}
