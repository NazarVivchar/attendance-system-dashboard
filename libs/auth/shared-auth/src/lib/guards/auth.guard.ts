import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {
  DataAccessEmployeesService
} from "../../../../../employees/data-access-employees/src/lib/data-access-employees.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly dataAccessWorkspaceService: DataAccessWorkspaceService,
    private readonly dataAccessEmployeesService: DataAccessEmployeesService,
  ) {
  }

  public canActivate(): UrlTree | boolean {
    const workspaceJson = localStorage.getItem('workspace');

    if (workspaceJson) {
      try {
        const workspace = JSON.parse(workspaceJson) as WorkspaceModel;

        this.dataAccessWorkspaceService.setWorkspace(workspace);
        this.dataAccessEmployeesService.loadEmployees(workspace._id)

        return true;
        //     eslint-disable-next-line no-empty
      } catch (e) {
      }
    }

    return this.router.createUrlTree(['/auth']);
  }
}
