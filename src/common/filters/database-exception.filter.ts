import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DatabaseException } from '../exceptions/database.exception';

@Catch(DatabaseException)
export class DatabaseExceptionFilter<
  DatabaseException,
> extends BaseExceptionFilter {}
