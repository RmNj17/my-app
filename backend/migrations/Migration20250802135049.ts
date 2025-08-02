import { Migration } from '@mikro-orm/migrations';

export class Migration20250802135049 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "verification_status" text check ("verification_status" in ('pending', 'verified', 'rejected')) null default 'pending', add column "skills" jsonb null, add column "certificates" jsonb null, add column "terms_accepted" boolean not null default false, add column "fare" numeric(10,2) null;`);
    this.addSql(`alter table "user" add constraint "user_role_check" check("role" in ('tourist', 'guide', 'admin'));`);

    this.addSql(`alter table "booking" alter column "message" type varchar(255) using ("message"::varchar(255));`);
    this.addSql(`alter table "booking" alter column "message" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_role_check";`);

    this.addSql(`alter table "user" drop column "verification_status", drop column "skills", drop column "certificates", drop column "terms_accepted", drop column "fare";`);

    this.addSql(`alter table "user" alter column "role" type text using ("role"::text);`);

    this.addSql(`alter table "booking" alter column "message" type varchar(255) using ("message"::varchar(255));`);
    this.addSql(`alter table "booking" alter column "message" drop not null;`);
  }

}
