import {Component, Input} from '@angular/core';
import {EmployeeModel} from "@asd/employees/models-employees";

@Component({
  selector: 'asd-employees-todays-statistics',
  templateUrl: './employees-todays-statistics.component.html',
  styleUrls: ['./employees-todays-statistics.component.scss']
})
export class EmployeesTodaysStatisticsComponent {
  @Input() public employees!: EmployeeModel[] | null;

}
