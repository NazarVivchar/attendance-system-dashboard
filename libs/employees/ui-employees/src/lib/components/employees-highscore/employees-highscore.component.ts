import {Component, Input} from '@angular/core';
import {CheckModel, EmployeeModel} from "@asd/employees/models-employees";
import maxBy from 'lodash/maxBy';
import minBy from "lodash/minBy";
import uniq from "lodash/uniq";

interface EmployeeWithHoursWorkedModel {
  employee: EmployeeModel,
  hoursWorked: number,
}

interface EmployeeWithDaysWorkedModel {
  employee: EmployeeModel,
  daysWorked: number,
}

interface EmployeeWithCheckModel {
  employee: EmployeeModel,
  check: CheckModel | null,
}

@Component({
  selector: 'asd-employees-highscore',
  templateUrl: './employees-highscore.component.html',
  styleUrls: ['./employees-highscore.component.scss']
})
export class EmployeesHighscoreComponent {
  @Input() public employees!: EmployeeModel[] | null;

  public get employeeWithMostHoursWorked(): EmployeeWithHoursWorkedModel | null {
    if (!this.employees?.length) {
      return null;
    }

    const employeesWithHoursWorked = this.employees.map(employee => ({
      employee,
      hoursWorked: Math.floor(this.calculateEmployeeHoursWorked(employee) || 0)
    }))

    const employeeWithHoursWorked = maxBy(employeesWithHoursWorked, 'hoursWorked') || null;

    if (!employeeWithHoursWorked || employeeWithHoursWorked?.hoursWorked === 0) {
      return null;
    }

    return employeeWithHoursWorked;
  }

  public get employeeWithMostDaysWorked(): EmployeeWithDaysWorkedModel | null {
    if (!this.employees?.length) {
      return null;
    }

    const employeesWithMostDaysWorked = this.employees.map(employee => ({
      employee,
      daysWorked: Math.floor(this.calculateEmployeeDaysWorked(employee) || 0)
    }))

    const employeeWithDaysWorked = maxBy(employeesWithMostDaysWorked, 'daysWorked') || null;

    if (!employeeWithDaysWorked || employeeWithDaysWorked?.daysWorked === 0) {
      return null;
    }

    return employeeWithDaysWorked;
  }

  public get employeeWithEarliestCheck(): EmployeeWithCheckModel | null {
    if (!this.employees?.length) {
      return null;
    }

    const employeesWithEarliestClockIn = this.employees.map(employee => ({
      employee,
      check: this.getEarliestCheck(employee) || null
    })).filter(({check}) => !!check)


    const employeeWithEarliestClockIn = minBy(employeesWithEarliestClockIn, (employee) => {
      if (!employee.check) {
        return 0;
      }

      const checkInDate = this.getCheckInDate(employee.check);

      return checkInDate.getHours() * 60 + checkInDate.getMinutes();
    })

    if (!employeeWithEarliestClockIn?.check?.in) {
      return null;
    }

    return employeeWithEarliestClockIn;
  }

  public get employeeWithLatestCheckOut(): EmployeeWithCheckModel | null {
    if (!this.employees?.length) {
      return null;
    }

    const employeesWithLatestCheckOut = this.employees.map(employee => ({
      employee,
      check: this.getLatestCheck(employee) || null
    })).filter(({check}) => !!check)


    const employeeWithLatestCheckOut = maxBy(employeesWithLatestCheckOut, (employee) => {
      if (!employee.check) {
        return 0;
      }

      const checkOutDate = this.getCheckOutDate(employee.check);

      return checkOutDate.getHours() * 60 + checkOutDate.getMinutes();
    })

    if (!employeeWithLatestCheckOut?.check?.out) {
      return null;
    }

    return employeeWithLatestCheckOut;
  }

  private calculateEmployeeHoursWorked(employeeModel: EmployeeModel): number {
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

  private calculateEmployeeDaysWorked(employeeModel: EmployeeModel): number {
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

  private getEarliestCheck(employeeModel: EmployeeModel): CheckModel | null {
    if (!employeeModel.allChecks?.length) {
      return null;
    }

    const earliestCheck = minBy(this.getChecksForCurrentMonth(employeeModel), (check) => {
      const checkInDate = this.getCheckInDate(check);

      return checkInDate.getHours() * 60 + checkInDate.getMinutes();
    })

    return earliestCheck || null;
  }

  private getLatestCheck(employeeModel: EmployeeModel): CheckModel | null {
    if (!employeeModel.allChecks?.length) {
      return null;
    }

    const earliestCheck = maxBy(this.getChecksForCurrentMonth(employeeModel), (check) => {
      const checkOutDate = this.getCheckOutDate(check);

      return checkOutDate.getHours() * 60 + checkOutDate.getMinutes();
    })

    return earliestCheck || null;
  }

  private getChecksForCurrentMonth(employeeModel: EmployeeModel): CheckModel[] {
    if (!employeeModel.allChecks?.length) {
      return [];
    }

    return employeeModel.allChecks.filter(check => this.isCheckInCurrentMonth(check));
  }

  private calculateCheckHoursWorked(check: CheckModel | null): number | null {
    if (!check) {
      return 0;
    }

    const checkInDate = this.getCheckInDate(check);
    const checkOutDate = this.getCheckOutDate(check);

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return this.millisecondsToHours(timeDifference);
  }

  private isCheckInCurrentMonth(check: CheckModel): boolean {
    const checkInDate = this.getCheckInDate(check);
    const checkOutDate = this.getCheckOutDate(check);

    return this.isDateInCurrentMonth(checkInDate) && this.isDateInCurrentMonth(checkOutDate);
  }

  private isDateInCurrentMonth(date: Date): boolean {
    const currentDate = new Date(), y = currentDate.getFullYear(), m = currentDate.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    return date.getTime() > firstDay.getTime() && date.getTime() < lastDay.getTime()
  }

  private millisecondsToHours(milliseconds: number): number {
    return milliseconds / 1000 / 60 / 60;
  }

  private getCheckInDate(check: CheckModel): Date {
    const {in: checkInDateStr} = check;

    return new Date(checkInDateStr);
  }

  private getCheckOutDate(check: CheckModel): Date {
    const {out: checkOutDateStr} = check;

    return checkOutDateStr ? new Date(checkOutDateStr) : new Date();
  }

  public goToEmployee(employee: EmployeeModel): void {
    console.log(employee);
  }
}
