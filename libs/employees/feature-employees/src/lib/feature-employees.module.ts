import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './components/employees/employees.component';
import {RouterModule} from "@angular/router";
import { EmployeeComponent } from './components/employee/employee.component';
import {FeatureEmployeesRouting} from "./feature-employees.routing";
import {EmployeesInfoComponent} from "./components/employees-info/employees-info.component";
import {EmployeesUiEmployeesModule} from "@asd/employees/ui-employees";
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';

@NgModule({
  imports: [CommonModule, RouterModule, FeatureEmployeesRouting, EmployeesUiEmployeesModule],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeesInfoComponent,
    AllEmployeesComponent
  ],
})
export class FeatureEmployeesModule {}
