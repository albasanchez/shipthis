import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1590191476355 implements MigrationInterface {
    name = 'firstMigration1590191476355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol" ("rol_id" SERIAL NOT NULL, "rol_name" character varying(50) NOT NULL, CONSTRAINT "PK_69836b191b6c07ec3fd08de3a1a" PRIMARY KEY ("rol_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "person" ("person_id" SERIAL NOT NULL, "document" character varying(30), "first_name" character varying NOT NULL, "middle_name" character varying, "last_name" character varying NOT NULL, "second_last_name" character varying, "gender" character varying(2) DEFAULT 'O', "phone_code" character varying(10), "phone_number" character varying(20), "date_of_birth" date, "current_conn_date" date, "previous_conn_date" date, "def_language" character varying DEFAULT 'en', "profile_picture" bytea, "picture_url" character varying, "receive_notifications" boolean DEFAULT false, CONSTRAINT "CHK_ef5e764d8e134bc11f271ad6ff" CHECK (gender IN ('M','F','O')), CONSTRAINT "PK_403c951c5e9b776c16385a8940f" PRIMARY KEY ("person_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "userdata" ("user_id" SERIAL NOT NULL, "user_email" character varying, "user_name" character varying, "user_password" character varying NOT NULL, "registration_date" date NOT NULL, "registration_type" character varying NOT NULL DEFAULT 'REGULAR', "user_status" character varying NOT NULL DEFAULT 'ACTIVE', "person_fk" integer NOT NULL, "rol_fk" integer NOT NULL, CONSTRAINT "UQ_7049d378d9f08b08825f60390ea" UNIQUE ("user_email"), CONSTRAINT "UQ_104649051d6bb047b035de9e2be" UNIQUE ("user_name"), CONSTRAINT "REL_9456ab24f29b50e6200b2bffc2" UNIQUE ("person_fk"), CONSTRAINT "CHK_41224fdbad9c1b732a52405308" CHECK (user_status IN ('ACTIVE','BLOCKED','RESETED')), CONSTRAINT "CHK_041477776ec2cfef0fcb96a925" CHECK (registration_type IN ('REGULAR','FACEBOOK','GOOGLE')), CONSTRAINT "PK_fe628a5477e8bec13b42dd4b935" PRIMARY KEY ("user_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "place" ("place_id" SERIAL NOT NULL, "place_address" character varying(200), "position_lat" numeric, "position_long" numeric, "zip_code" character varying(10), CONSTRAINT "PK_70c627cd1b010fdbb38215247f9" PRIMARY KEY ("place_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "office" ("office_id" SERIAL NOT NULL, "office_name" character varying(200) NOT NULL, "phone_code" character varying(10) NOT NULL, "phone_number" character varying(20) NOT NULL, "office_status" character varying NOT NULL DEFAULT 'ACTIVE', "place_fk" integer NOT NULL, CONSTRAINT "CHK_0f24c33b66dad533cc74b051b1" CHECK (office_status IN ('ACTIVE','BLOCKED')), CONSTRAINT "PK_fd2b2c154f489966f3dee586599" PRIMARY KEY ("office_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order_type" ("order_type_id" SERIAL NOT NULL, "order_name" character varying(100) NOT NULL, "days_to_deliver" integer NOT NULL, "order_type_status" character varying(50) NOT NULL, CONSTRAINT "CHK_d11ea106207269040a7997d7de" CHECK (order_type_status IN ('ACTIVE','BLOCKED')), CONSTRAINT "PK_a602aa1231b2399d4ce6f2453a3" PRIMARY KEY ("order_type_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order_price_hist" ("order_price_hist_id" SERIAL NOT NULL, "starting_date" date NOT NULL, "ending_date" date, "time_tax" numeric NOT NULL, "hollydays_tax" numeric NOT NULL, "specific_destinatio_tax" numeric NOT NULL, "order_type_fk" integer NOT NULL, CONSTRAINT "PK_930e26301506974b59f9f510614" PRIMARY KEY ("order_price_hist_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "check_box" ("check_point_id" SERIAL NOT NULL, "check_point_order" integer NOT NULL, "time_mark" TIMESTAMP, "trajectory_fk" integer NOT NULL, "place_fk" integer NOT NULL, CONSTRAINT "PK_8da851d3d5f7f8cd0d1ad76e6b1" PRIMARY KEY ("check_point_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "trajectory" ("trajectory_id" SERIAL NOT NULL, "linear_distance" numeric, "efective_distance" numeric, "ordersheet_fk" integer NOT NULL, CONSTRAINT "PK_dcbf5fe6ca612e0689fd757ab43" PRIMARY KEY ("trajectory_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "ordersheet" ("ordersheet_id" SERIAL NOT NULL, "tracking_number" character varying(20) NOT NULL, "creation_date" date NOT NULL, "order_status" character varying NOT NULL DEFAULT 'GENERATED', "rec_fullname" character varying(200) NOT NULL, "rec_phone_code" character varying(10) NOT NULL, "rec_phone_number" character varying(20) NOT NULL, "delivery_date" date, "date_to_be_delivered" date, "facturation_date" date, "facturation_amount" numeric, "ignore_hollydays" boolean DEFAULT false, "user_fk" integer NOT NULL, "origin_office_fk" integer NOT NULL, "order_type_fk" integer NOT NULL, "destination_office_fk" integer, "destination_place_fk" integer, CONSTRAINT "UQ_a1ca316f592bf3541188e4ea049" UNIQUE ("tracking_number"), CONSTRAINT "CHK_596f189e3ee3837922dcd9f50c" CHECK (order_status IN ('GENERATED','DELIVERY','TRANSIT','DELIVERED')), CONSTRAINT "PK_eb5e76653fb0a72077d9317fdc7" PRIMARY KEY ("ordersheet_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "item" ("item_id" SERIAL NOT NULL, "item_weight" numeric, "item_volumen" numeric, "is_insured" boolean DEFAULT false, "is_fragile" boolean DEFAULT false, "ordersheet_fk" integer NOT NULL, "item_price_hist_fk" integer NOT NULL, CONSTRAINT "PK_8b21aa99996acd87a00c0ce553a" PRIMARY KEY ("item_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "item_price_hist" ("item_price_hist_id" SERIAL NOT NULL, "starting_date" date NOT NULL, "ending_date" date, "base_price" numeric NOT NULL, "price_km" numeric NOT NULL, "ensurance_tax" numeric NOT NULL, "fragily_tax" numeric NOT NULL, "item_type_fk" integer NOT NULL, CONSTRAINT "PK_d7ac57740949f4cb20f4a8aad1c" PRIMARY KEY ("item_price_hist_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "item_type" ("item_type_id" SERIAL NOT NULL, "item_name" character varying(100) NOT NULL, "max_weight" numeric NOT NULL, "max_volume" numeric NOT NULL, "item_type_status" character varying(50) NOT NULL, "category_fk" integer NOT NULL, CONSTRAINT "CHK_1c99fd5dd0e805ab90b078c8c7" CHECK (item_type_status IN ('ACTIVE','BLOCKED')), CONSTRAINT "PK_f61c7abadd9af5e37860e79be73" PRIMARY KEY ("item_type_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "caegory_name" character varying(200) NOT NULL, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "comment_box" ("comment_id" SERIAL NOT NULL, "time_mark" TIMESTAMP NOT NULL, "comment_message" character varying(500) NOT NULL, CONSTRAINT "PK_4aa67d2594ddc2032aa4b6c6a90" PRIMARY KEY ("comment_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "userdata" ADD CONSTRAINT "FK_9456ab24f29b50e6200b2bffc20" FOREIGN KEY ("person_fk") REFERENCES "person"("person_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "userdata" ADD CONSTRAINT "FK_ad602afa4833d8cc2c47c8938f5" FOREIGN KEY ("rol_fk") REFERENCES "rol"("rol_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "office" ADD CONSTRAINT "FK_573092d14d8f38e20b8105daa9e" FOREIGN KEY ("place_fk") REFERENCES "place"("place_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order_price_hist" ADD CONSTRAINT "FK_0a49934945b4cf13a69f1917efb" FOREIGN KEY ("order_type_fk") REFERENCES "order_type"("order_type_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "check_box" ADD CONSTRAINT "FK_b256e5f4f22f3cf383c7598540a" FOREIGN KEY ("trajectory_fk") REFERENCES "trajectory"("trajectory_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "check_box" ADD CONSTRAINT "FK_650ce5d9281f3fda04cf7e94bda" FOREIGN KEY ("place_fk") REFERENCES "place"("place_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "trajectory" ADD CONSTRAINT "FK_038a2f13b1dc4b4bac75598a57c" FOREIGN KEY ("ordersheet_fk") REFERENCES "ordersheet"("ordersheet_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" ADD CONSTRAINT "FK_2e9ed5d59787d8b79e07ec5b802" FOREIGN KEY ("user_fk") REFERENCES "userdata"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" ADD CONSTRAINT "FK_d1bc79e52402bbc7ea02244c97a" FOREIGN KEY ("origin_office_fk") REFERENCES "office"("office_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" ADD CONSTRAINT "FK_11edbf2abd6fb0b39e4addc1743" FOREIGN KEY ("order_type_fk") REFERENCES "order_price_hist"("order_price_hist_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" ADD CONSTRAINT "FK_eddb6fdda1b168b1e77ec5a2802" FOREIGN KEY ("destination_office_fk") REFERENCES "office"("office_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" ADD CONSTRAINT "FK_0816eca2e3105242388ba979bfe" FOREIGN KEY ("destination_place_fk") REFERENCES "place"("place_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_921880fa8e0bdf14e7b27f9d3be" FOREIGN KEY ("ordersheet_fk") REFERENCES "ordersheet"("ordersheet_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_55437d6b69af0b88545556ed131" FOREIGN KEY ("item_price_hist_fk") REFERENCES "item_price_hist"("item_price_hist_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "item_price_hist" ADD CONSTRAINT "FK_8aff866daa77c287da84b62e678" FOREIGN KEY ("item_type_fk") REFERENCES "item_type"("item_type_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "item_type" ADD CONSTRAINT "FK_58c8bef3956e6281ade78bc07a8" FOREIGN KEY ("category_fk") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_type" DROP CONSTRAINT "FK_58c8bef3956e6281ade78bc07a8"`, undefined);
        await queryRunner.query(`ALTER TABLE "item_price_hist" DROP CONSTRAINT "FK_8aff866daa77c287da84b62e678"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_55437d6b69af0b88545556ed131"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_921880fa8e0bdf14e7b27f9d3be"`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" DROP CONSTRAINT "FK_0816eca2e3105242388ba979bfe"`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" DROP CONSTRAINT "FK_eddb6fdda1b168b1e77ec5a2802"`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" DROP CONSTRAINT "FK_11edbf2abd6fb0b39e4addc1743"`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" DROP CONSTRAINT "FK_d1bc79e52402bbc7ea02244c97a"`, undefined);
        await queryRunner.query(`ALTER TABLE "ordersheet" DROP CONSTRAINT "FK_2e9ed5d59787d8b79e07ec5b802"`, undefined);
        await queryRunner.query(`ALTER TABLE "trajectory" DROP CONSTRAINT "FK_038a2f13b1dc4b4bac75598a57c"`, undefined);
        await queryRunner.query(`ALTER TABLE "check_box" DROP CONSTRAINT "FK_650ce5d9281f3fda04cf7e94bda"`, undefined);
        await queryRunner.query(`ALTER TABLE "check_box" DROP CONSTRAINT "FK_b256e5f4f22f3cf383c7598540a"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_price_hist" DROP CONSTRAINT "FK_0a49934945b4cf13a69f1917efb"`, undefined);
        await queryRunner.query(`ALTER TABLE "office" DROP CONSTRAINT "FK_573092d14d8f38e20b8105daa9e"`, undefined);
        await queryRunner.query(`ALTER TABLE "userdata" DROP CONSTRAINT "FK_ad602afa4833d8cc2c47c8938f5"`, undefined);
        await queryRunner.query(`ALTER TABLE "userdata" DROP CONSTRAINT "FK_9456ab24f29b50e6200b2bffc20"`, undefined);
        await queryRunner.query(`DROP TABLE "comment_box"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
        await queryRunner.query(`DROP TABLE "item_type"`, undefined);
        await queryRunner.query(`DROP TABLE "item_price_hist"`, undefined);
        await queryRunner.query(`DROP TABLE "item"`, undefined);
        await queryRunner.query(`DROP TABLE "ordersheet"`, undefined);
        await queryRunner.query(`DROP TABLE "trajectory"`, undefined);
        await queryRunner.query(`DROP TABLE "check_box"`, undefined);
        await queryRunner.query(`DROP TABLE "order_price_hist"`, undefined);
        await queryRunner.query(`DROP TABLE "order_type"`, undefined);
        await queryRunner.query(`DROP TABLE "office"`, undefined);
        await queryRunner.query(`DROP TABLE "place"`, undefined);
        await queryRunner.query(`DROP TABLE "userdata"`, undefined);
        await queryRunner.query(`DROP TABLE "person"`, undefined);
        await queryRunner.query(`DROP TABLE "rol"`, undefined);
    }

}
