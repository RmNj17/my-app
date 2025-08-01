import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryKey()
  id: string = uuidv4();

  @ManyToOne(() => User)
  tourist!: User;

  @ManyToOne(() => User)
  guide!: User;

  @Property()
  date!: Date;

  @Property()
  message!: string;

  @Property({ default: 'pending' })
  status: string = 'pending';
}
