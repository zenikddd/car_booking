import { Catch } from '@nestjs/common';
import { WrongDatesException } from '../exceptions';
import { BaseExceptionFilter } from "./base-exception.filter";

@Catch(WrongDatesException)
export class WrongDatesExceptionFilter extends BaseExceptionFilter<WrongDatesException> {}
