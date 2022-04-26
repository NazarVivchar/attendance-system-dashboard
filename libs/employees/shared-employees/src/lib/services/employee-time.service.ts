import {Injectable} from '@angular/core';
import {CheckModel, EmployeeModel} from "@asd/employees/models-employees";
import uniq from "lodash/uniq";

@Injectable({
  providedIn: 'root'
})
export class EmployeeTimeService {

  public calculateEmployeeHoursWorked(employeeModel: EmployeeModel): number {
    if (!employeeModel.allChecks?.length) {
      return 0;
    }

    return this.getChecksForCurrentMonth(employeeModel).reduce((accum, check) => {
      if (!this.isDateInCurrentMonth(new Date(check.in)) || !this.isDateInCurrentMonth(new Date(check.out))) {
        return accum;
      }
      return accum + (this.calculateCheckHoursWorked(check) || 0);
    }, 0)
  }

  private getChecksForCurrentMonth(employeeModel: EmployeeModel): CheckModel[] {
    if (!employeeModel.allChecks?.length) {
      return [];
    }

    return employeeModel.allChecks.filter(check => this.isCheckInCurrentMonth(check));
  }

  public calculateEmployeeDaysWorked(employeeModel: EmployeeModel): number {
    if (!employeeModel.allChecks?.length) {
      return 0;
    }

    const monthDatesWorkedOn: number[] = this.getChecksForCurrentMonth(employeeModel).reduce<number[]>((accum, check) => {
      if (!this.isDateInCurrentMonth(new Date(check.in)) || !this.isDateInCurrentMonth(new Date(check.out))) {
        return accum;
      }

      const date = this.getCheckOutDate(check).getDate();
      accum.push(date)
      return accum;
    }, [])

    return uniq(monthDatesWorkedOn).length;
  }

  public calculateCheckHoursWorked(check: CheckModel | null): number | null {
    if (!check) {
      return 0;
    }

    const millisecondsWorked = this.calculateCheckMillisecondsWorked(check);

    if(!millisecondsWorked) {
      return 0;
    }

    return this.millisecondsToHours(millisecondsWorked);
  }

  public calculateCheckMillisecondsWorked(check: CheckModel | null): number | null {
    if (!check) {
      return 0;
    }

    const checkInDate = this.getCheckInDate(check);
    const checkOutDate = this.getCheckOutDate(check);

    return checkOutDate.getTime() - checkInDate.getTime();
  }

  public isCheckInToday(check: CheckModel): boolean {
    const checkInDate = this.getCheckInDate(check);

    return this.isDateToday(checkInDate);
  }

  public isCheckInCurrentMonth(check: CheckModel): boolean {
    const checkInDate = this.getCheckInDate(check);
    const checkOutDate = this.getCheckOutDate(check);

    return this.isDateInCurrentMonth(checkInDate) && this.isDateInCurrentMonth(checkOutDate);
  }

  public getCheckInDate(check: CheckModel): Date {
    const {in: checkInDateStr} = check;

    return new Date(checkInDateStr);
  }

  public getCheckOutDate(check: CheckModel): Date {
    const {out: checkOutDateStr} = check;

    return checkOutDateStr ? new Date(checkOutDateStr) : new Date();
  }

  private isDateInCurrentMonth(date: Date): boolean {
    const currentDate = new Date(), y = currentDate.getFullYear(), m = currentDate.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    return date.getTime() > firstDay.getTime() && date.getTime() < lastDay.getTime()
  }

  private isDateToday(date: Date): boolean {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    return date.getTime() > startOfDay.getTime() && date.getTime() <= endOfDay.getTime()
  }

  private millisecondsToHours(milliseconds: number): number {
    return milliseconds / 1000 / 60 / 60;
  }
}
