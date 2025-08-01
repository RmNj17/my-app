import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Booking } from './entities/booking.entity';
import { User } from '../users/entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Booking)
    private readonly bookingRepo: EntityRepository<Booking>,
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  async createBooking(touristId: string, dto: CreateBookingDto) {
    const tourist = await this.userRepo.findOne({ id: touristId });
    const guide = await this.userRepo.findOne({ id: dto.guideId });

    if (!tourist || !guide) {
      throw new BadRequestException('Guide or tourist not found');
    }

    if (tourist.role !== 'tourist') {
      throw new ForbiddenException('Only tourists can create bookings');
    }

    if (guide.role !== 'guide') {
      throw new BadRequestException('Invalid guide ID');
    }

    try {
      const booking = this.bookingRepo.create({
        tourist,
        guide,
        date: new Date(dto.date),
        message: dto.message,
        status: 'pending',
      });

      await this.em.persistAndFlush(booking);
      return { message: 'Booking created successfully.' };
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException('Invalid guide or tourist ID');
      }
      throw new BadRequestException('Failed to create booking');
    }
  }

  async getBookings(userId: string, role: 'tourist' | 'guide') {
    const where = role === 'tourist' ? { tourist: userId } : { guide: userId };

    const bookings = await this.bookingRepo.find(where, {
      populate: ['tourist', 'guide'],
      orderBy: { date: 'DESC' },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      date: booking.date,
      message: booking.message,
      status: booking.status,
      tourist: {
        id: booking.tourist.id,
        name: booking.tourist.name,
        email: booking.tourist.email,
        profilePicture: booking.tourist.profilePicture,
      },
    }));
  }
  async updateBookingStatus(
    id: string,
    status: 'accepted' | 'rejected',
    guideId: string,
  ) {
    const booking = await this.bookingRepo.findOne(
      { id },
      { populate: ['guide'] },
    );

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (booking.guide.id !== guideId) {
      throw new UnauthorizedException(
        'You are not authorized to update this booking',
      );
    }

    booking.status = status;
    await this.em.flush();

    return { message: `Booking ${status} successfully.` };
  }
}
