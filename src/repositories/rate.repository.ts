import { Injectable } from '@nestjs/common';
import { DatabaseException } from '../common/exceptions/database.exception';
import { Client } from 'pg';
import { DbClientService, IRate } from '../common';

@Injectable()
export class RateRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async getRateById(rateId: number): Promise<IRate> {
    try {
      const res = await this.client.query(
        `select * from rate where id=${rateId}`,
      );
      const rate = res.rows[0];

      return {
        id: rate.id,
        distance: rate.distance,
        cost: rate.cost,
      };
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
