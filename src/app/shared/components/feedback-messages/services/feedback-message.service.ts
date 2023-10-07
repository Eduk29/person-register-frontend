import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IFeedbackMessage } from './../../../models/feedback-messages.model';
import { FeedbackMessagesComponent } from './../feedback-messages.component';

@Injectable({
  providedIn: 'root',
})
export class FeedbackMessageService {
  constructor(private readonly snackbar: MatSnackBar) {}

  public displayAPIErrorFeedbackMessage(message?: string): void {
    const apiError: IFeedbackMessage = {
      displayCloseButton: false,
      displayIcon: true,
      iconName: 'warning',
      message: message || 'Unavailable service, please return later!',
    };

    this.snackbar.openFromComponent(FeedbackMessagesComponent, {
      data: apiError,
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
    });
  }

  public displayAPISuccessFeedbackMessage(message?: string): void {
    const apiSuccess: IFeedbackMessage = {
      displayCloseButton: false,
      displayIcon: true,
      iconName: 'check',
      message: message || 'Sucess',
    };

    this.snackbar.openFromComponent(FeedbackMessagesComponent, {
      data: apiSuccess,
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: 'success-snackbar',
      verticalPosition: 'top',
    });
  }
}
