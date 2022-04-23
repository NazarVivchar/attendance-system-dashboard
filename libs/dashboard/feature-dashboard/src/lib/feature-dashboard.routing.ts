import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('@asd/home/feature-home').then((m) => m.FeatureHomeModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('@asd/home/feature-home').then((m) => m.FeatureHomeModule)
      },
    ]
  },
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class FeatureDashboardRouting {
}
