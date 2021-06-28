import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../../repositories/booking.repository';
import { BookingDto } from './booking.dto';
import { TimeConstant, IBooking, WrongDatesException } from '../../common';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  public async bookCar(bookingDto: BookingDto): Promise<void> {
    const start = new Date(bookingDto.startDate);
    const end = new Date(bookingDto.endDate);
    const lastBooking = await this.bookingRepository.getLastBookingByCarId(
      bookingDto.carId,
    );
    if (this.isAvailableToBook(start, end, lastBooking)) {
      await this.bookingRepository.bookCar({
        carId: bookingDto.carId,
        startDate: bookingDto.startDate,
        endDate: bookingDto.endDate,
      });
      return;
    }
    throw new WrongDatesException();
  }

  private isAvailableToBook(
    start: Date,
    end: Date,
    lastBooking: IBooking,
  ): boolean {
    if (this.isWeekends(start, end)) {
      return false;
    }

    if (!lastBooking) {
      return true;
    }

    const lastEndDate = new Date(lastBooking.endDate);
    const days =
      (start.getTime() - lastEndDate.getTime()) /
      TimeConstant.MILLISECONDS_IN_DAY;

    return days >= 3;
  }

  private isWeekends(start: Date, end: Date): boolean {
    return [6, 0].includes(start.getDay()) || [6, 0].includes(end.getDay());
  }
}
