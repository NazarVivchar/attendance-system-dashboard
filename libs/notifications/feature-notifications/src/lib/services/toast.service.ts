import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NotificationConfig} from "../models/notification-config.model";
import {ToastType} from "../enums/toast-type.enum";

@Injectable()
export class ToastService {
  private readonly timeout = 6000;

  constructor(private readonly toastrService: ToastrService) {
  }

  public showSuccessNotification(message: string, title?: string | undefined): void {
    const notificationConfig: NotificationConfig = {
      title,
      message,
      type: ToastType.Success,
    };

    this.showNotification(notificationConfig)
  }

  public showErrorNotification(message: string, title?: string | undefined): void {
    const notificationConfig: NotificationConfig = {
      title,
      message,
      type: ToastType.Error,
    };

    this.showNotification(notificationConfig);
  }

  private showNotification(notificationConfig: NotificationConfig): void {
    const toastrConfig = {
      closeButton: true,
      timeout: this.timeout,
      progressBar: true,
    };

    if(notificationConfig.type === ToastType.Success) {
      this.toastrService.success(notificationConfig.message, notificationConfig.title, toastrConfig)
      return;
    }

    if(notificationConfig.type === ToastType.Error) {
      this.toastrService.error(notificationConfig.message, notificationConfig.title, toastrConfig)
      return;
    }
  }
}
