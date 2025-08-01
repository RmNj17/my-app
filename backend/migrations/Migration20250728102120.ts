import { Migration } from '@mikro-orm/migrations';

export class Migration20250728102120 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "booking" ("id" varchar(255) not null, "tourist_id" varchar(255) not null, "guide_id" varchar(255) not null, "date" timestamptz not null, "status" varchar(255) not null default 'pending', "message" varchar(255) null, constraint "booking_pkey" primary key ("id"));`);

    this.addSql(`alter table "booking" add constraint "booking_tourist_id_foreign" foreign key ("tourist_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "booking" add constraint "booking_guide_id_foreign" foreign key ("guide_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "booking" cascade;`);
  }

}
