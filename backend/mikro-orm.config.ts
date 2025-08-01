import { defineConfig } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Booking } from './src/bookings/entities/booking.entity';

config();

export default defineConfig({
  entities: [User, Booking],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  forceEntityConstructor: true,
  debug: true,
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    emit: 'ts',
  },
});
