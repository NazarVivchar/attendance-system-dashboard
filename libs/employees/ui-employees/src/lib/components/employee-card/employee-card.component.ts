import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeModel} from "@asd/employees/models-employees";
import FastAverageColor from 'fast-average-color';
import {Router} from "@angular/router";

@Component({
  selector: 'asd-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements AfterViewInit {
  @Input() public employee!: EmployeeModel;

  private readonly fac = new FastAverageColor();

  constructor(private readonly host: ElementRef<HTMLElement>, private readonly router: Router,
  ) {
  }

  public ngAfterViewInit(): void {
    this.setHeaderBackgroundColors();
  }

  public goToEmployee(): void {
    this.router.navigate(['/', 'dashboard', 'employees', this.employee._id]);
  }

  private setHeaderBackgroundColors(): void {
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
}
