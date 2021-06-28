import { DatabaseException, DbClientService, IReport } from '../common';
import { Client } from 'pg';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportRepository {
  client: Client;

  constructor(private dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  async getReportById(carId: number): Promise<IReport[]> {
    try {
      const result = await this.client
        .query(`SELECT ((1.0 * A1.count) / (1.0 * A2.count)) * 100 as percent, A2.day_of_week 
                    from (SELECT COUNT(EXTRACT(ISODOW FROM t.day)) as count, EXTRACT(ISODOW FROM t.day) as day_of_week
                          FROM car_booking, generate_series(start_date
                                  , end_date
                                  , interval '1 day') AS t(day)
                          WHERE car_booking.car_id=${carId}
                          GROUP BY EXTRACT (ISODOW FROM t.day)) A1
                             JOIN
                         (SELECT COUNT(EXTRACT(ISODOW FROM t.day)) as count, EXTRACT(ISODOW FROM t.day) as day_of_week
                          FROM generate_series((SELECT register_date from car where id=${carId})
                                  , DATE (Now())
                                  , interval '1 day') AS t(day)
                          GROUP BY EXTRACT (ISODOW FROM t.day)) A2
                         ON A2.day_of_week = A1.day_of_week`);
      return result.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }

  async getReportAllCars(): Promise<IReport[]> {
    try {
      const test = await this.client
        .query(`SELECT ((1.0 * A1.count) / (1.0 * A2.count)) * 100 as percent, A2.day_of_week
                   from (SELECT COUNT(EXTRACT(ISODOW FROM t.day)) as count, EXTRACT(ISODOW FROM t.day) as day_of_week
                         FROM car_booking, generate_series(start_date
                                 , end_date
                                 , interval '1 day') AS t(day)
                         GROUP BY EXTRACT (ISODOW FROM t.day)) A1
                            LEFT JOIN
                        (SELECT COUNT(EXTRACT(ISODOW FROM t.day)) as count, EXTRACT(ISODOW FROM t.day) as day_of_week
                         FROM car, generate_series((register_date )
                                 , DATE (Now())
                                 , interval '1 day') AS t(day)
                         GROUP BY EXTRACT (ISODOW FROM t.day)) A2
                        ON A2.day_of_week = A1.day_of_week`);
      return test.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
