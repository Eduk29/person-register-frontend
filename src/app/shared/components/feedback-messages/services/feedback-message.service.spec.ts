import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeedbackMessagesComponent } from '../feedback-messages.component';
import { IFeedbackMessage } from './../../../../shared/models/feedback-messages.model';
import { FeedbackMessageService } from './feedback-message.service';

describe('FeedbackMessageService', () => {
  let service: FeedbackMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackMessagesComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatSnackBarModule],
    });
    service = TestBed.inject(FeedbackMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should call snackbar when error is dispatched', () => {
    const spy = spyOn(service['snackbar'], 'openFromComponent').and.callThrough();
    service.displayAPIErrorFeedbackMessage();

    expect(spy).toHaveBeenCalled();
  });

  it('service should call snackbar with data when error is dispatcher', () => {
    const spy = spyOn(service['snackbar'], 'openFromComponent').and.callThrough();
    const fakeComponent = FeedbackMessagesComponent;
    const fakeMessage = 'This is a fake message';
    const fakeFeedbackMessage: IFeedbackMessage = {
      displayCloseButton: false,
      displayIcon: true,
      iconName: 'warning',
      message: fakeMessage,
    };
    const fakeSnackbarData = {
      data: fakeFeedbackMessage,
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
    };

    service.displayAPIErrorFeedbackMessage(fakeMessage);

    expect(spy).toHaveBeenCalledWith(fakeComponent, fakeSnackbarData as MatSnackBarConfig);
  });

  it('service should call snackbar with default data when error is dispatcher', () => {
    const spy = spyOn(service['snackbar'], 'openFromComponent').and.callThrough();
    const fakeComponent = FeedbackMessagesComponent;
    const fakeMessage = 'Unavailable service, please return later!';
    const fakeFeedbackMessage: IFeedbackMessage = {
      displayCloseButton: false,
      displayIcon: true,
      iconName: 'warning',
      message: fakeMessage,
    };
    const fakeSnackbarData = {
      data: fakeFeedbackMessage,
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: 'error-snackbar',
      verticalPosition: 'top',
    };

    service.displayAPIErrorFeedbackMessage();

    expect(spy).toHaveBeenCalledWith(fakeComponent, fakeSnackbarData as MatSnackBarConfig);
  });
});
