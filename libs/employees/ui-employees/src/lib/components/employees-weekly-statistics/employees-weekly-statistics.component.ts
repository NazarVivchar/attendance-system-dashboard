import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CheckModel, EmployeeModel} from "@asd/employees/models-employees";
import {EmployeeTimeService} from "@asd/employees/shared-employees";
import isNumber from "lodash/isNumber";

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];


@Component({
  selector: 'asd-employees-weekly-statistics',
  templateUrl: './employees-weekly-statistics.component.html',
  styleUrls: ['./employees-weekly-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesWeeklyStatisticsComponent {
  @Input() public employees!: EmployeeModel[] | null;

  public averageHoursPerDay = new Array(7).fill(0);

  constructor(private readonly employeeTimeService: EmployeeTimeService) {
  }


  public getAverageHoursWorkedPerDayForCurrentWeek(): { name: string, value: number }[] | null {
    if (!this.employees) {
      return null;
    }

    this.averageHoursPerDay = new Array(7).fill(0);
    const allChecksForCurrentWeek = [];

    for (const employee of this.employees) {
      const checksForCurrentWeek = this.getChecksForCurrentWeek(employee);

      if (!checksForCurrentWeek.length) continue;

      allChecksForCurrentWeek.push(...checksForCurrentWeek);
    }

    let checksPerWeek = 0;

    for (let day = 0; day < 7; ++day) {
      let checksPerDay = 0;

      for (const check of allChecksForCurrentWeek) {
        const checkInDate = new Date(check.in);

        const checkInDayOfWeek = checkInDate.getDay();

        if (checkInDayOfWeek !== day) continue;

        const checkHoursWorked = this.employeeTimeService.calculateCheckHoursWorked(check);

        if (!isNumber(checkHoursWorked)) continue;

        this.averageHoursPerDay[day] += checkHoursWorked;

        ++checksPerDay;
      }

      if (this.averageHoursPerDay[day] > 0) {
        this.averageHoursPerDay[day] = +(this.averageHoursPerDay[day] / checksPerDay).toFixed(2);
      }

      checksPerWeek += checksPerDay;
    }

    if(!checksPerWeek) return null;

    const chartData = this.averageHoursPerDay.map((hours, index) => {
      return {
        name: daysOfWeek[index],
        value: hours,
      }
    });

    return [...chartData.slice(1), chartData[0]]
  }

  private getChecksForCurrentWeek(employee: EmployeeModel): CheckModel[] {
    if (!employee.allChecks?.length) {
      return [];
    }

    return employee.allChecks.filter(check => {
      return check.in && this.employeeTimeService.isDateInCurrentWeek(new Date(check.in));
    })
  }

  // ngOnChanges(): void {
  //   console.log(this.employees);
  //   this.getEmployeeHoursWorkedPerDayForCurrentWeek();
  // }

  // public averageHoursClockedPerDay = [
  //   {
  //     name: 'Monday',
  //   }
  // ]

  // public readonly results = [
  //   {
  //     "name": "Germany",
  //     "value": 40632,
  //     "extra": {
  //       "code": "de"
  //     }
  //   },
  //   {
  //     "name": "United States",
  //     "value": 50000,
  //     "extra": {
  //       "code": "us"
  //     }
  //   },
  //   {
  //     "name": "France",
  //     "value": 36745,
  //     "extra": {
  //       "code": "fr"
  //     }
  //   },
  //   {
  //     "name": "United Kingdom",
  //     "value": 36240,
  //     "extra": {
  //       "code": "uk"
  //     }
  //   },
  //   {
  //     "name": "Spain",
  //     "value": 33000,
  //     "extra": {
  //       "code": "es"
  //     }
  //   },
  //   {
  //     "name": "Italy",
  //     "value": 35800,
  //     "extra": {
  //       "code": "it"
  //     }
  //   }
  // ]

}
