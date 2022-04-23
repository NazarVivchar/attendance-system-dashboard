import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'asd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @ViewChild(ToastContainerDirective) public toastContainer!: ToastContainerDirective

  constructor(private readonly toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }
}
