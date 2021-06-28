import { ReportResponseDto } from '../model/report-response.dto';
import { IReport } from '../../../common/interfaces/report.interface';

export class ReportMapper {
  public convert(reportEntity: IReport[]): ReportResponseDto[] {
    return reportEntity.map((report) => ({
      dayOfWeek: this.dayNumberToDayString(report.day_of_week),
      percent: report.percent,
    }));
  }

  private dayNumberToDayString(day: number): string {
    switch (day) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
    }
  }
}
