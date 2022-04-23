import { NgModule } from '@angular/core';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {ToastService} from "./services/toast.service";
import {FeatureNotificationsService} from "./feature-notifications.service";
import {ToastContainerModule, ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [ToastrModule.forRoot(), ToastContainerModule],
  declarations: [
    NotificationsComponent
  ],
  providers: [ToastService, FeatureNotificationsService],
  exports: [
    NotificationsComponent
  ]
})
export class FeatureNotificationsModule {}
