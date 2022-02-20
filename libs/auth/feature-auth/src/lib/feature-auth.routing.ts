import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import {LogInComponent} from "./components/log-in/log-in.component";

const ROUTES: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', redirectTo: 'log-in', pathMatch: 'full' },
      {path: 'log-in', component: LogInComponent}
    ]
  },


]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class FeatureAuthRouting {}
