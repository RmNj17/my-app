import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User, UserRole, VerificationStatus } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAllByRole(role: UserRole) {
    return this.userRepository.find(
      { role },
      {
        fields: ['id', 'name', 'email', 'profilePicture'],
      },
    );
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async findPendingGuides() {
    const pendingGuides = await this.userRepository.find({
      role: UserRole.GUIDE,
      verificationStatus: VerificationStatus.PENDING,
    });
    return pendingGuides
      .map((guide) => ({
        id: guide.id,
        name: guide.name,
        email: guide.email,
        profilePicture: guide.profilePicture,
        verificationStatus: guide.verificationStatus,
      }))
      .filter(
        (guide) => guide.verificationStatus === VerificationStatus.PENDING,
      );
  }

  async updateVerificationStatus(
    id: string,
    status: VerificationStatus,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      user.verificationStatus = status;
      await this.em.flush();
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async createAdminUser() {
    const em = this.em.fork();
    const adminExists = await em.findOne(User, {
      role: UserRole.ADMIN,
    });
    if (adminExists) return;

    const password = await bcrypt.hash('adminPassword123', 10);
    const adminUser = em.create(User, {
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      phone: '1234567890',
      role: UserRole.ADMIN,
      termsAccepted: true,
      verificationStatus: VerificationStatus.VERIFIED,
    });

    await em.persistAndFlush(adminUser);
  }
}
