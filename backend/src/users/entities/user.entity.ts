import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  ADMIN = 'admin',
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
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

  @Enum(() => UserRole)
  role!: UserRole;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property({ nullable: true })
  guideLicense?: string;

  @Enum({
    items: () => VerificationStatus,
    nullable: true,
    default: VerificationStatus.PENDING,
  })
  verificationStatus?: VerificationStatus;

  @Property({ type: 'json', nullable: true })
  skills?: string[];

  @Property({ type: 'json', nullable: true })
  certificates?: string[];

  @Property({ default: false })
  termsAccepted: boolean = false;

  @Property({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fare?: number;
}
