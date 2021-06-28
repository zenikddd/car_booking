import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  Max,
  Validate,
} from 'class-validator';
import { IsBeforeConstraint } from '../../common/constraints/isbefore.constraint';
import { IsLessThanMonthConstraint } from '../../common/constraints/isLessThanMonthConstraint';

export class BookingDto {
  @IsDateString()
  @IsNotEmpty()
  @Validate(IsBeforeConstraint, ['endDate'])
  @Validate(IsLessThanMonthConstraint, ['endDate'])
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @Max(3)
  rateId: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @Max(5)
  carId: number;
}
