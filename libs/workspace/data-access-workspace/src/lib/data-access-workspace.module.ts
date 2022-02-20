import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkspaceEffects} from "./store/effects/workspace.effects";
import {StoreModule} from "@ngrx/store";
import * as fromWorkspace from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";

const EFFECTS = [WorkspaceEffects]

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature(fromWorkspace.featureKey, fromWorkspace.reducers),
    EffectsModule.forFeature(EFFECTS)
  ],
  providers: []
})
export class DataAccessWorkspaceModule {
}
