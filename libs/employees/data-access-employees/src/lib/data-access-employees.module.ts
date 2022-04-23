import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import * as fromEmployees from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {EmployeesEffects} from "./store/effects/employees.effects";

const EFFECTS = [EmployeesEffects]

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature(fromEmployees.featureKey, fromEmployees.reducers),
    EffectsModule.forFeature(EFFECTS)
  ],
  providers: []
})
export class DataAccessEmployeesModule {
}
