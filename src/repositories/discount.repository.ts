import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DatabaseException, DbClientService, IDiscount } from '../common';

@Injectable()
export class DiscountRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async getDiscountByDays(days: number): Promise<IDiscount> {
    try {
      const res = await this.client.query(`select *
											   from discount
											   where from_days <= ${days} and to_days >= ${days}`);

      const discount = res.rows[0];
      return discount
        ? {
            id: discount.id,
            rate: discount.rate,
            fromDays: discount.from_days,
            toDays: discount.to_days,
          }
        : {
            rate: 0,
          };
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
