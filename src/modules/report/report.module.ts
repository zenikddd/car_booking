import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { ReportMapper } from './mapper/report-mapper';

@Module({
  imports: [RepositoriesModule],
  controllers: [ReportController],
  providers: [ReportService, ReportMapper],
})
export class ReportModule {}
