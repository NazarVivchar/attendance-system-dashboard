import { Component, Input, OnDestroy } from '@angular/core';
import {EmployeeModel} from "@asd/employees/models-employees";
import {EmployeeTimeService} from "@asd/employees/shared-employees";
import {interval, Subscription, tap} from "rxjs";

@Component({
  selector: 'asd-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.scss']
})
export class EmployeeStatusComponent implements OnDestroy {
  @Input() public employee!: EmployeeModel | null;

  public workingForDate: Date | null = null;

  private timerSubscription!: Subscription;

  constructor(private readonly employeeTimeService: EmployeeTimeService) {
  }

  public ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  public get hasCheckedInToday(): boolean {
    if (!this.employee?.lastCheck) {
      return false;
    }

    return this.employeeTimeService.isCheckInToday(this.employee.lastCheck)
  }

  public get isWorking(): boolean {
    if (!this.employee?.lastCheck) {
      return false;
    }

    const hasCheckedOut = !!this.employee.lastCheck.out;

    return this.employeeTimeService.isCheckInToday(this.employee.lastCheck)  && !hasCheckedOut;
  }

  public get checkedInTime(): Date | null {
    const checkInDateStr = this.employee?.lastCheck?.in;

    return checkInDateStr ? new Date(checkInDateStr) : null;
  }

  public get checkedOutTime(): Date | null {
    const checkOutDateStr = this.employee?.lastCheck?.out;

    return checkOutDateStr ? new Date(checkOutDateStr) : null;
  }

  public initTimer(): void {
    if(!this.employee) return

    this.timerSubscription = interval(1000).pipe(tap(() => {
        const millisecondsWorked = this.employeeTimeService.calculateCheckMillisecondsWorked(this.employee?.lastCheck || null)

        if (!millisecondsWorked) {
          return;
        }

        this.workingForDate = new Date(0, 0, 0);
        this.workingForDate.setMilliseconds(millisecondsWorked);
      }
    )).subscribe(() => {
      if (this.employee?.lastCheck?.out) this.timerSubscription.unsubscribe();
    })
  }
}
