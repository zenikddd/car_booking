import { Global, Module } from '@nestjs/common';
import { RateRepository } from './rate.repository';
import { DiscountRepository } from './discount.repository';
import { BookingRepository } from './booking.repository';
import { DbClientServicesModule } from '../common';
import { ReportRepository } from './report.repository';

@Global()
@Module({
  imports: [DbClientServicesModule],
  providers: [
    RateRepository,
    DiscountRepository,
    BookingRepository,
    ReportRepository,
  ],
  exports: [
    RateRepository,
    DiscountRepository,
    BookingRepository,
    ReportRepository,
  ],
})
export class RepositoriesModule {}
