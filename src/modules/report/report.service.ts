import { Injectable } from '@nestjs/common';
import { ReportRepository } from '../../repositories/report.repository';
import { ReportResponseDto } from './model/report-response.dto';
import { ReportMapper } from './mapper/report-mapper';

@Injectable()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private reportMapper: ReportMapper,
  ) {}

  async getReportById(carId: number): Promise<ReportResponseDto[]> {
    const result = await this.reportRepository.getReportById(carId);
    return this.reportMapper.convert(result);
  }

  async getReportAllCars(): Promise<ReportResponseDto[]> {
    const result = await this.reportRepository.getReportAllCars();
    return this.reportMapper.convert(result);
  }
}
