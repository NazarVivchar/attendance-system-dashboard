import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import FastAverageColor from "fast-average-color";
import {EmployeeModel} from "@asd/employees/models-employees";

@Component({
  selector: 'asd-employee-general-details',
  templateUrl: './employee-general-details.component.html',
  styleUrls: ['./employee-general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeGeneralDetailsComponent {
  @Input() set employee(value: EmployeeModel | null) {
    this._employee = value;

    if (this._employee) {
      this.setBackgroundColors();
    }
  } ;

  public get employee(): EmployeeModel | null {
    return this._employee || null;
  }

  public isEditingMode = false;

  private _employee?: EmployeeModel | null;

  private readonly fac = new FastAverageColor();

  constructor(private readonly host: ElementRef<HTMLElement>) {
  }

  private setBackgroundColors(): void {
    this.fac.getColorAsync(this.avatarUrl).then((color) => {
      const colorRgbValues = color.value.slice(0, 3).join(',');

      this.setHostStyleProperty('--avatar-background-color-light', `rgba(${colorRgbValues}, 0.3)`);
      this.setHostStyleProperty('--avatar-background-color-dark', `rgba(${colorRgbValues}, 0.9)`);
    })
  }

  private setHostStyleProperty(property: string, value: string): void {
    this.host.nativeElement.style.setProperty(property, value);
  }

  private get avatarUrl(): string {
    return `data:image/png;base64,${this.employee?.avatar}`;
  }

  public delete(): void {

  }

  public edit(): void {

  }
}
