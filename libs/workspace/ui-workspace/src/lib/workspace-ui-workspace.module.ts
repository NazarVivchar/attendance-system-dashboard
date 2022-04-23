import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceInfoComponent } from './components/workspace-info/workspace-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    WorkspaceInfoComponent
  ],
  exports: [
    WorkspaceInfoComponent
  ],
})
export class WorkspaceUiWorkspaceModule {}
