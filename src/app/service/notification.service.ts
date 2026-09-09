import { Injectable } from '@angular/core';
import { ToastService, ToastOptions } from '../service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
