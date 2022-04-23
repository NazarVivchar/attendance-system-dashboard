import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {DataAccessWorkspaceModule} from "@asd/workspace/data-access-workspace";

@NgModule({
  imports: [RouterModule, RouterModule, DataAccessWorkspaceModule],
  providers: [AuthGuard],
})
export class SharedAuthModule {}
