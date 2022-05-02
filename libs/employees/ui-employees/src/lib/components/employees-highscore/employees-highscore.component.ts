import {Component, Input} from '@angular/core';
import {CheckModel, EmployeeModel} from "@asd/employees/models-employees";
import maxBy from 'lodash/maxBy';
import minBy from "lodash/minBy";
import {EmployeeTimeService} from "@asd/employees/shared-employees";
import {Router} from "@angular/router";

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

  constructor(private readonly employeeTimeService: EmployeeTimeService, private readonly router: Router) {
  }

  public get employeeWithMostHoursWorked(): EmployeeWithHoursWorkedModel | null {
    if (!this.employees?.length) {
      return null;
    }

    const employeesWithHoursWorked = this.employees.map(employee => ({
      employee,
      hoursWorked: Math.floor(this.employeeTimeService.calculateEmployeeHoursWorked(employee) || 0)
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
      daysWorked: Math.floor(this.employeeTimeService.calculateEmployeeDaysWorked(employee) || 0)
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

      const checkInDate = this.employeeTimeService.getCheckInDate(employee.check);

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

      const checkOutDate = this.employeeTimeService.getCheckOutDate(employee.check);

      return checkOutDate.getHours() * 60 + checkOutDate.getMinutes();
    })

    if (!employeeWithLatestCheckOut?.check?.out) {
      return null;
    }

    return employeeWithLatestCheckOut;
  }

  private getEarliestCheck(employeeModel: EmployeeModel): CheckModel | null {
    if (!employeeModel.allChecks?.length) {
      return null;
    }

    const earliestCheck = minBy(this.getChecksForCurrentMonth(employeeModel), (check) => {
      const checkInDate = this.employeeTimeService.getCheckInDate(check);

      return checkInDate.getHours() * 60 + checkInDate.getMinutes();
    })

    return earliestCheck || null;
  }

  private getLatestCheck(employeeModel: EmployeeModel): CheckModel | null {
    if (!employeeModel.allChecks?.length) {
      return null;
    }

    const earliestCheck = maxBy(this.getChecksForCurrentMonth(employeeModel), (check) => {
      const checkOutDate = this.employeeTimeService.getCheckOutDate(check);

      return checkOutDate.getHours() * 60 + checkOutDate.getMinutes();
    })

    return earliestCheck || null;
  }

  private getChecksForCurrentMonth(employeeModel: EmployeeModel): CheckModel[] {
    if (!employeeModel.allChecks?.length) {
      return [];
    }

    return employeeModel.allChecks.filter(check => this.employeeTimeService.isCheckInCurrentMonth(check));
  }

  public goToEmployee(employee: EmployeeModel): void {
    this.router.navigate(['/', 'dashboard', 'employees', employee._id]);
  }
}
