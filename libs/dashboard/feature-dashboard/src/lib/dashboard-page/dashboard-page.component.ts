import {Component} from '@angular/core';
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";
import {
  DataAccessEmployeesService
} from "@asd/employees/data-access-employees";
import {filter, switchMap, take} from "rxjs";

@Component({
  selector: 'asd-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  public readonly workspace$ = this.dataAccessWorkspaceService.workspace$;

  constructor(
    private readonly dataAccessWorkspaceService: DataAccessWorkspaceService,
    private readonly dataAccessEmployeesService: DataAccessEmployeesService,
  ) {
    this.initLoadingEmployees();
  }

  private initLoadingEmployees(): void {
    this.dataAccessEmployeesService.loaded$.pipe(
      filter(loaded => !loaded),
      switchMap(() => this.dataAccessWorkspaceService.workspace$.pipe(
        filter(Boolean),
        take(1)
      ))
    ).subscribe((workspace) => this.dataAccessEmployeesService.loadEmployees(workspace._id));
  }
}
