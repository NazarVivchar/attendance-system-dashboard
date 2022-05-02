import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesHighscoreComponent} from './components/employees-highscore/employees-highscore.component';
import {EmployeeAvatarComponent} from './components/employee-avatar/employee-avatar.component';
import {
  EmployeesTodaysStatisticsComponent
} from './components/employees-todays-statistics/employees-todays-statistics.component';
import {
  EmployeeSingleDayStatisticsComponent
} from './components/employee-single-day-statistics/employee-single-day-statistics.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {
  EmployeesWeeklyStatisticsComponent
} from './components/employees-weekly-statistics/employees-weekly-statistics.component';
import {BarChartModule} from "@swimlane/ngx-charts";
import {EmployeeCardComponent} from "./components/employee-card/employee-card.component";
import { EmployeeGeneralDetailsComponent } from './components/employee-general-details/employee-general-details.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { EmployeeStatusComponent } from './components/employee-status/employee-status.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, BarChartModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  declarations: [
    EmployeesHighscoreComponent,
    EmployeeAvatarComponent,
    EmployeesTodaysStatisticsComponent,
    EmployeeSingleDayStatisticsComponent,
    EmployeesWeeklyStatisticsComponent,
    EmployeeCardComponent,
    EmployeeGeneralDetailsComponent,
    EmployeeStatusComponent,
  ],
  exports: [
    EmployeesHighscoreComponent,
    EmployeesTodaysStatisticsComponent,
    EmployeesWeeklyStatisticsComponent,
    EmployeeAvatarComponent,
    EmployeeCardComponent,
    EmployeeGeneralDetailsComponent,
    EmployeeStatusComponent,
  ],
})
export class EmployeesUiEmployeesModule {
}
