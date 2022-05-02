import { Component } from '@angular/core';
import {DataAccessEmployeesService} from "@asd/employees/data-access-employees";

@Component({
  selector: 'asd-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent {
  public employees$ = this.dataAccessEmployeesService.employees$;

  constructor(
    private readonly dataAccessEmployeesService: DataAccessEmployeesService,
  ) { }
}
