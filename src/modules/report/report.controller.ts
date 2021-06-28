import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResponseDto } from './model/report-response.dto';
import { DatabaseExceptionFilter } from '../../common/filters';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/getById')
  @UseFilters(new DatabaseExceptionFilter())
  async getReportById(
    @Query('carId') carId: number,
  ): Promise<ReportResponseDto[]> {
    return this.reportService.getReportById(carId);
  }

  @Get('/getAllCars')
  @UseFilters(new DatabaseExceptionFilter())
  async getReportAllCars(): Promise<ReportResponseDto[]> {
    return this.reportService.getReportAllCars();
  }
}
