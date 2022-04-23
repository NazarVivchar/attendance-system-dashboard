import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";
import {Subscription, take} from "rxjs";
import {FeatureNotificationsService} from "@asd/notifications/feature-notifications";
import {Router} from "@angular/router";
import {concatLatestFrom} from "@ngrx/effects";

@Component({
  selector: 'asd-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnDestroy {
  private form!: FormGroup;
  private notificationSubscription!: Subscription;

  constructor(
    private readonly dataAccessWorkspaceService: DataAccessWorkspaceService,
    private readonly featureNotificationsService: FeatureNotificationsService,
    private readonly router: Router,
  ) {
    this.buildForm();
    this.initNotifications();
    this.initSettingWorkspaceToLocalStorage();
  }

  public ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe()
  }

  public get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const name = this.nameControl.value;
      const password = this.passwordControl.value;

      this.dataAccessWorkspaceService.singInToWorkspace(name, password);
    }
  }

  private initNotifications(): void {
    this.notificationSubscription = this.featureNotificationsService.subscribeToError(
      this.dataAccessWorkspaceService.error$
    )
  }

  private initSettingWorkspaceToLocalStorage(): void {
    this.dataAccessWorkspaceService.singInToWorkspaceSuccess$.pipe(
      take(1),
      concatLatestFrom(() => this.dataAccessWorkspaceService.workspace$),
    ).subscribe(([, workspace]) => {
      const workspaceJson = JSON.stringify(workspace);

      localStorage.setItem('workspace', workspaceJson);

      this.router.navigate(['/dashboard'])
    })
  }
}
