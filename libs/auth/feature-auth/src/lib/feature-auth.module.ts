import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogInComponent} from './components/log-in/log-in.component';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {FeatureAuthRouting} from "./feature-auth.routing";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {DataAccessWorkspaceModule} from "@asd/workspace/data-access-workspace";

@NgModule({
  imports: [CommonModule, FeatureAuthRouting, MatDividerModule, MatIconModule, MatButtonModule, MatInputModule, ReactiveFormsModule, DataAccessWorkspaceModule],
  declarations: [
    LogInComponent,
    AuthPageComponent
  ],
})
export class FeatureAuthModule {
}
