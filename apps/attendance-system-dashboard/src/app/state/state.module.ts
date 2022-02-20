import {NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {appReducer, metaReducers} from "./app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, {
      metaReducers,
      runtimeChecks: {strictStateImmutability: true, strictActionImmutability: true}
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
  ]
})
export class StateModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule,
  ) {
    if(parentModule) {
      throw new Error('StateModule has already been loaded. Import it to the AppModule only')
    }
  }
}
