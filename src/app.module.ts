import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CostModule } from './modules/cost/cost.module';
import { BookingModule } from './modules/booking/booking.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CostModule,
    BookingModule,
    ReportModule,
  ],
})
export class AppModule {}
