// src/bookings/bookings.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(req.user.id, dto);
  }

  @Get()
  getAll(@Request() req) {
    return this.bookingsService.getBookings(req.user.id, req.user.role);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'accepted' | 'rejected',
    @Request() req,
  ) {
    return this.bookingsService.updateBookingStatus(id, status, req.user.id);
  }
}
