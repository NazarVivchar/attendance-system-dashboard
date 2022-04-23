import {Component, Input} from '@angular/core';

@Component({
  selector: 'asd-employee-avatar',
  templateUrl: './employee-avatar.component.html',
  styleUrls: ['./employee-avatar.component.scss']
})
export class EmployeeAvatarComponent {
  @Input() public avatarSrc!: string;
}
