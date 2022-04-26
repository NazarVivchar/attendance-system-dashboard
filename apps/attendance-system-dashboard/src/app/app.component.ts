import {Component} from '@angular/core';
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";

@Component({
  selector: 'asd-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'attendance-system-dashboard';

  constructor(private readonly dataAccessWorkspaceService: DataAccessWorkspaceService) {
  }

  public logOut() {
    localStorage.clear();
    this.dataAccessWorkspaceService.resetWorkspace();
    window.location.reload();
  }
}
