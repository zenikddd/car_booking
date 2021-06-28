CREATE TABLE "car"
(
	"id"            serial                 NOT NULL,
	"brand"         character varying(300) NOT NULL,
	"model"         character varying(300) NOT NULL,
	"license_plate" character varying(300) NOT NULL,
	"vin"           character varying(300) NOT NULL,
    "register_date" date NOT NULL,
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
INSERT INTO car(brand, model, license_plate, vin, register_date) VALUES ('tesla', 'model x', 'Т033ТМ', '1FMCU0E71CKB86966', '2021-01-01'), ('bmw', 'i8', 'А327РК', '1HGEJ6600TL060913', '2021-03-01'), ('toyota', 'supra', 'Т630УС', 'JF2SJGUC2FH513006', '2021-05-01'), ('mercedes-benz', 'g-class', 'В547РС', '2G1FP22G922147195', '2021-05-15'), ('honda', 'civic', 'О605КХ', '2HGFG21547H776568', '2021-06-01');
INSERT INTO car_booking(car_id, start_date, end_date) VALUES (1, '2021-01-30', '2021-06-27'), (2, '2021-04-30', '2021-06-27'), (3, '2021-05-30', '2021-06-27'), (4, '2021-06-01', '2021-06-27'), (5, '2021-06-14', '2021-06-27');
