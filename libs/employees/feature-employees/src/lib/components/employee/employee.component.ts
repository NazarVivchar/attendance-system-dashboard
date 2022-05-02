import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from "rxjs";
import {EmployeeModel} from "@asd/employees/models-employees";
import {DataAccessEmployeesService} from "@asd/employees/data-access-employees";

@Component({
  selector: 'asd-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public employee$!: Observable<EmployeeModel | null>;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly dataAccessEmployeesService: DataAccessEmployeesService) {
  }

  ngOnInit(): void {
    this.employee$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const employeeId = params?.['employeeId'];

        return this.dataAccessEmployeesService.getEmployeeById(employeeId);
      })
    )
  }
}
