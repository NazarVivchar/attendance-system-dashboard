import {Injectable, OnDestroy} from '@angular/core';
import {filter, merge, Observable, observeOn, queueScheduler, Subject, Subscription} from "rxjs";
import {ToastService} from "./services/toast.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Injectable()
export class FeatureNotificationsService implements OnDestroy {
  public error$ = new Subject<HttpErrorResponse | string>();
  public success$ = new Subject<string>();

  private errorSubscription = this.error$.subscribe(message => this.showError(message))
  private successSubscription = this.success$.subscribe(message => this.showSuccess(message))

  private readonly httpStatusCodeToMessageMap = new Map<number, string>([
    [HttpStatusCode.Unauthorized, 'Entered credentials are invalid'],
    [HttpStatusCode.NotFound, 'Data not found'],
    [HttpStatusCode.Forbidden, 'Action not allowed'],

  ]);

  constructor(private readonly toastService: ToastService) {
  }

  public ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
    this.successSubscription.unsubscribe()
  }

  public subscribeToError(...messages$: Observable<string | null>[]): Subscription {
    const mergedMessages = merge(...messages$);

    return this.applyFilterAndScheduler(mergedMessages).subscribe(message => this.error$.next(message || ''))
  }

  public subscribeToSuccess(...messages$: Observable<string>[]): Subscription {
    const mergedMessages = merge(...messages$);

    return this.applyFilterAndScheduler(mergedMessages).subscribe(message => this.success$.next(message))
  }

  private applyFilterAndScheduler<T>(source$: Observable<T>): Observable<T> {
    return source$.pipe(filter<T>(Boolean), observeOn(queueScheduler))
  }

  private showError(message: HttpErrorResponse | string): void {
    const messageToShow = this.getErrorMessage(message);

    this.toastService.showErrorNotification(messageToShow);
  }

  private showSuccess(message: string): void {
    this.toastService.showSuccessNotification(message);
  }

  private getErrorMessage(errorResponse: HttpErrorResponse | string): string {
    if (typeof errorResponse === 'string') {
      return errorResponse;
    }

    const httpStatusCodeErrorMessage = this.httpStatusCodeToMessageMap.get(errorResponse.status);

    return httpStatusCodeErrorMessage || 'Something went wrong';
  }
}

