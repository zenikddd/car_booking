import { Injectable } from '@nestjs/common';
import { CostDto } from './cost.dto';
import { RateRepository } from '../../repositories/rate.repository';
import { CostInterface } from './cost.interface';
import { DiscountRepository } from '../../repositories/discount.repository';
import { TimeConstant } from '../../common';

@Injectable()
export class CostService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly discountRepository: DiscountRepository,
  ) {}

  public async calculateCost(costDto: CostDto): Promise<CostInterface> {
    const start = new Date(costDto.startDate);
    const end = new Date(costDto.endDate);

    const days =
      (end.getTime() - start.getTime()) / TimeConstant.MILLISECONDS_IN_DAY;
    const discount = await this.discountRepository.getDiscountByDays(days);
    const discountCoefficient = 1 - discount.rate / 100;
    const rate = await this.rateRepository.getRateById(costDto.rateId);

    return {
      days: days,
      cost: days * rate.cost * discountCoefficient,
      rate: rate.cost,
      discount: discount.rate,
    };
  }
}
