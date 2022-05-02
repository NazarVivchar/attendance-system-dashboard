import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AllEmployeesComponent} from "./components/all-employees/all-employees.component";

const ROUTES: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      {
        path: 'all',
        component: AllEmployeesComponent,
      },
      {
        path: ':employeeId',
        component: EmployeeComponent,
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class FeatureEmployeesRouting {
}
