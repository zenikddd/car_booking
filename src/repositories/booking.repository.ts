import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DbClientService, DatabaseException, IBooking } from '../common';

@Injectable()
export class BookingRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async bookCar(booking: IBooking): Promise<void> {
    try {
      await this.client
        .query(`insert into car_booking(car_id, start_date, end_date)
									 values (${booking.carId}, '${booking.startDate}', '${booking.endDate}')`);
    } catch (err) {
      throw new DatabaseException();
    }
  }

  public async getLastBookingByCarId(carId: number): Promise<IBooking> {
    try {
      const res = await this.client.query(`select *
											   from car_booking
											   where car_id = ${carId}
											   order by end_date desc`);
      const last = res.rows[0];
      return last
        ? {
            id: last.id,
            carId: last.car_id,
            startDate: last.start_date,
            endDate: last.end_date,
          }
        : undefined;
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
