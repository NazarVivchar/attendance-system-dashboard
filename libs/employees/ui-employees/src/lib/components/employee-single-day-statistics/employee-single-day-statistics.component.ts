import {Component, Input, OnDestroy} from '@angular/core';
import {EmployeeModel} from "@asd/employees/models-employees";
import {EmployeeTimeService} from "@asd/employees/shared-employees";
import {interval, Subscription, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'asd-employee-single-day-statistics',
  templateUrl: './employee-single-day-statistics.component.html',
  styleUrls: ['./employee-single-day-statistics.component.scss']
})
export class EmployeeSingleDayStatisticsComponent implements OnDestroy {
  @Input() public employee!: EmployeeModel

  public workingForDate: Date | null = null;

  private timerSubscription!: Subscription;

  constructor(private readonly employeeTimeService: EmployeeTimeService, private readonly router: Router) {
    this.initTimer();
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  public goToEmployee(): void {
    this.router.navigate(['/', 'dashboard', 'employees', this.employee._id]);
  }

  public get hasCheckedInToday(): boolean {
    if (!this.employee.lastCheck) {
      return false;
    }

    return this.employeeTimeService.isCheckInToday(this.employee.lastCheck)
  }

  public get checkedInTime(): Date | null {
    const checkInDateStr = this.employee.lastCheck?.in;

    return checkInDateStr ? new Date(checkInDateStr) : null;
  }

  public get checkedOutTime(): Date | null {
    const checkOutDateStr = this.employee.lastCheck?.out;

    return checkOutDateStr ? new Date(checkOutDateStr) : null;
  }

  public initTimer(): void {
    this.timerSubscription = interval(1000).pipe(tap(() => {
        const millisecondsWorked = this.employeeTimeService.calculateCheckMillisecondsWorked(this.employee.lastCheck)

        if (!millisecondsWorked) {
          return;
        }

        this.workingForDate = new Date(0, 0, 0);
        this.workingForDate.setMilliseconds(millisecondsWorked);
      }
    )).subscribe(() => {
      if (this.employee.lastCheck?.out) this.timerSubscription.unsubscribe();
    })
  }
}
