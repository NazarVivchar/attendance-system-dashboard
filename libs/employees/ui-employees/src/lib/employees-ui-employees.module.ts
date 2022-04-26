import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesHighscoreComponent } from './components/employees-highscore/employees-highscore.component';
import { EmployeeAvatarComponent } from './components/employee-avatar/employee-avatar.component';
import { EmployeesTodaysStatisticsComponent } from './components/employees-todays-statistics/employees-todays-statistics.component';
import { EmployeeSingleDayStatisticsComponent } from './components/employee-single-day-statistics/employee-single-day-statistics.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [
    EmployeesHighscoreComponent,
    EmployeeAvatarComponent,
    EmployeesTodaysStatisticsComponent,
    EmployeeSingleDayStatisticsComponent,
  ],
  exports: [
    EmployeesHighscoreComponent,
    EmployeesTodaysStatisticsComponent
  ],
})
export class EmployeesUiEmployeesModule {}
