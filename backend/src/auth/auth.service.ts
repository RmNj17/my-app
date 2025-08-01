import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User, UserRole } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    profilePicture?: string;
    guideLicense?: string;
  }) {
    try {
      const existingUser = await this.userRepository.findOne({
        email: data.email,
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.userRepository.create({
        ...data,
        password: hashedPassword,
      });

      await this.em.persistAndFlush(user);

      return {
        message: 'Account created successfully. Please login to continue.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('[Signup Error]', error);
      throw new InternalServerErrorException(
        'Something went wrong during signup',
      );
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      return this.generateToken(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something went wrong during login',
      );
    }
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
