import {Component, Input} from '@angular/core';
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";
import {WorkspaceModel} from "@asd/workspace/models-workspace";

@Component({
  selector: 'asd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private readonly dataAccessWorkspaceService: DataAccessWorkspaceService) { }

  public logOut() {
    localStorage.clear();
    this.dataAccessWorkspaceService.resetWorkspace();
    window.location.reload();
  }
}
