import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureDashboardRouting} from "./feature-dashboard.routing";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRippleModule} from "@angular/material/core";
import {DataAccessEmployeesModule} from "@asd/employees/data-access-employees";
import {DataAccessWorkspaceModule} from "@asd/workspace/data-access-workspace";

@NgModule({
  imports: [CommonModule, FeatureDashboardRouting, MatIconModule, MatSidenavModule, MatButtonModule, MatDividerModule, MatRippleModule, DataAccessEmployeesModule, DataAccessWorkspaceModule],
  declarations: [SidenavComponent, DashboardPageComponent]
})
export class FeatureDashboardModule {
}
