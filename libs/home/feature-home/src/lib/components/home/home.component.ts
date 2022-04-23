import { Component } from '@angular/core';
import { DataAccessWorkspaceService } from "@asd/workspace/data-access-workspace";
import {DataAccessEmployeesService} from "@asd/employees/data-access-employees";

@Component({
  selector: 'asd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public workspace$ = this.dataAccessWorkspaceService.workspace$;
  public employees$ = this.dataAccessEmployeesService.employees$;

  constructor(
    private readonly dataAccessWorkspaceService: DataAccessWorkspaceService,
    private readonly dataAccessEmployeesService: DataAccessEmployeesService,
    ) { }
}
