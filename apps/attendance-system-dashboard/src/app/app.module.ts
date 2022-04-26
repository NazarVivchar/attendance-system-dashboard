import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouting} from "./app.routing";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StateModule} from "./state/state.module";
import {HttpClientModule} from "@angular/common/http";
import {FeatureNotificationsModule} from "@asd/notifications/feature-notifications";
import {SharedAuthModule} from "@asd/auth/shared-auth";
import {MatButtonModule} from "@angular/material/button";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    StateModule,
    HttpClientModule,
    FeatureNotificationsModule,
    SharedAuthModule,
    MatButtonModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
