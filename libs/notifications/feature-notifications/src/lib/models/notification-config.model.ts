import {ToastType} from "../enums/toast-type.enum";

export interface NotificationConfig {
 title?: string,
 message: string,
 type: ToastType,
}
