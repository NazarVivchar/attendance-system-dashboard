import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {EmployeeModel} from "@asd/employees/models-employees";

@Injectable({
  providedIn: "root"
})
export class EmployeesApiService {
  private readonly baseUrl: URL;

  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = new URL('http://localhost:3000/api/attendance-system/')
  }

  public loadWorkspaceEmployees(workspaceId: string): Observable<EmployeeModel[] | null> {
    const url = `${this.baseUrl}workspaces/${workspaceId}/users`

    return this.httpClient.get<EmployeeModel[]>(url);
  }
}
