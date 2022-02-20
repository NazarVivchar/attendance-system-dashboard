import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataAccessWorkspaceService} from "@asd/workspace/data-access-workspace";

@Component({
  selector: 'asd-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  private form!: FormGroup;

  constructor(private readonly dataAccessWorkspaceService: DataAccessWorkspaceService) {
    this.buildForm();
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
}
