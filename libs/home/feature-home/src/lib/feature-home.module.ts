import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeatureAuthRouting} from "./feature-home.routing";
import {MatSidenavModule} from "@angular/material/sidenav";
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {WorkspaceUiWorkspaceModule} from "@asd/workspace/ui-workspace";
import {EmployeesUiEmployeesModule} from "@asd/employees/ui-employees";

@NgModule({
    imports: [
        CommonModule,
        FeatureAuthRouting,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        WorkspaceUiWorkspaceModule,
        EmployeesUiEmployeesModule,
    ],
  declarations: [
    HomeComponent
  ],
})
export class FeatureHomeModule {}
