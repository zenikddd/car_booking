import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { WrongDatesException } from '../exceptions/wrongdates.exception';

@Catch(WrongDatesException)
export class WrongDatesExceptionFilter<
  WrongDatesException,
> extends BaseExceptionFilter {}
