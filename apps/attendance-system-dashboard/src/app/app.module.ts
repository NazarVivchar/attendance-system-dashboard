import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouting} from "./app.routing";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StateModule} from "./state/state.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouting, BrowserAnimationsModule, StateModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
