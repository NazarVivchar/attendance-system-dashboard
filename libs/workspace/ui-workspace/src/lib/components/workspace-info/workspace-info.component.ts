import {Component, Input} from '@angular/core';
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {EmployeeModel} from "@asd/employees/models-employees";

@Component({
  selector: 'asd-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.scss']
})
export class WorkspaceInfoComponent {
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
