import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  TOURIST = 'tourist',
  GUIDE = 'guide',
}

@Entity()
export class User {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  phone!: string;

  @Property({ type: 'text' })
  role!: UserRole;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property({ nullable: true })
  guideLicense?: string;
}
