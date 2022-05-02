import {Component, Input} from '@angular/core';
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {EmployeeModel} from "@asd/employees/models-employees";

@Component({
  selector: 'asd-employees-info',
  templateUrl: './employees-info.component.html',
  styleUrls: ['./employees-info.component.scss']
})
export class EmployeesInfoComponent {
  @Input() public workspace?: WorkspaceModel | null;
  @Input() public employees?: EmployeeModel[] | null;

  public get totalWorkdaysTracked(): string {
    if (!this.employees) {
      return 'unknown';
    }

    return this.employees.reduce((accum, employee) => {
      return accum + (employee.allChecks?.length || 0)
    }, 0).toString();
  }
}
