import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesHighscoreComponent } from './components/employees-highscore/employees-highscore.component';
import { EmployeeAvatarComponent } from './components/employee-avatar/employee-avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EmployeesHighscoreComponent,
    EmployeeAvatarComponent
  ],
  exports: [
    EmployeesHighscoreComponent
  ],
})
export class EmployeesUiEmployeesModule {}
