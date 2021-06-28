CREATE TABLE "car"
(
	"id"            serial                 NOT NULL,
	"brand"         character varying(300) NOT NULL,
	"model"         character varying(300) NOT NULL,
	"license_plate" character varying(300) NOT NULL,
	"vin"           character varying(300) NOT NULL,
	CONSTRAINT "car_pk" PRIMARY KEY ("id")
) WITH (
	  OIDS = FALSE
	  );



CREATE TABLE "car_booking"
(
	"id"         serial NOT NULL,
	"car_id"     bigint NOT NULL,
	"start_date" date NOT NULL,
	"end_date"   date NOT NULL,
	CONSTRAINT "car_booking_pk" PRIMARY KEY ("id")
) WITH (
	  OIDS = FALSE
	  );



CREATE TABLE "rate"
(
	"id"       serial NOT NULL,
	"distance" int    NOT NULL,
	"cost"     float NOT NULL,
	CONSTRAINT "rate_pk" PRIMARY KEY ("id")
) WITH (
	  OIDS = FALSE
	  );



CREATE TABLE "discount"
(
	"id"        serial NOT NULL,
	"rate"      int    NOT NULL UNIQUE,
	"from_days" int    NOT NULL,
	"to_days"   int    NOT NULL,
	CONSTRAINT "discount_pk" PRIMARY KEY ("id")
) WITH (
	  OIDS = FALSE
	  );



ALTER TABLE "car_booking"
	ADD CONSTRAINT "car_booking_fk0" FOREIGN KEY ("car_id") REFERENCES "car" ("id");

INSERT INTO rate(distance, cost) VALUES (200, 270), (350, 330), (500, 390);
INSERT INTO discount(rate, from_days, to_days) VALUES (5, 3, 5), (10, 6, 14), (15, 15, 30);
INSERT INTO car(brand, model, license_plate, vin) VALUES ('tesla', 'model x', 'Т033ТМ', '1FMCU0E71CKB86966'), ('bmw', 'i8', 'А327РК', '1HGEJ6600TL060913'), ('toyota', 'supra', 'Т630УС', 'JF2SJGUC2FH513006'), ('mercedes-benz', 'g-class', 'В547РС', '2G1FP22G922147195'), ('honda', 'civic', 'О605КХ', '2HGFG21547H776568');