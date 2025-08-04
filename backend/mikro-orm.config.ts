import { defineConfig } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Booking } from './src/bookings/entities/booking.entity';

config();

// Use DATABASE_URL if available (for Vercel production), otherwise use individual connection parameters
const getConnectionOptions = () => {
  if (process.env.DATABASE_URL) {
    return { clientUrl: process.env.DATABASE_URL };
  }

  return {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  };
};

export default defineConfig({
  ...getConnectionOptions(),
  entities: [User, Booking],
  forceEntityConstructor: true,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    emit: 'ts',
  },
  driverOptions: {
    connection: {
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    },
  },
});
