import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
