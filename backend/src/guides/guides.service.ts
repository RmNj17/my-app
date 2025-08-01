import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User, UserRole } from '../users/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getAllGuides() {
    const guides = await this.userRepository.find({ role: UserRole.GUIDE });

    return guides.map((guide) => ({
      id: guide.id,
      name: guide.name,
      email: guide.email,
      phone: guide.phone,
      profilePicture: guide.profilePicture,
      guideLicense: guide.guideLicense,
    }));
  }
}
