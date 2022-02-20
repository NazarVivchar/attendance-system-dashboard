import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('@asd/auth/feature-auth').then((m) => m.FeatureAuthModule)
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRouting {}
