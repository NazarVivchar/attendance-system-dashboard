import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkspaceModel} from "@asd/workspace/models-workspace";

@Injectable({
  providedIn: "root"
})
export class WorkspaceApiService {
  private readonly baseUrl: URL;

  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = new URL('http://localhost:3000/api/attendance-system/workspaces')
  }

  public singInToWorkspace(name: string, password: string): Observable<WorkspaceModel | null> {
    const url = `${this.baseUrl}/${name}/sign-in`
    const body = {password};

    return this.httpClient.post<WorkspaceModel>(url, body);
  }
}
