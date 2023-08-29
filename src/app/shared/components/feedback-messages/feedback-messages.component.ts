import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { IFeedbackMessage } from '../../models/feedback-messages.model';

@Component({
  selector: 'edv-feedback-messages',
  templateUrl: './feedback-messages.component.html',
  styleUrls: ['./feedback-messages.component.scss'],
})
export class FeedbackMessagesComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public feedbackMessageParameters: IFeedbackMessage) {}

  public get displayCloseButton(): boolean {
    return this.feedbackMessageParameters?.displayCloseButton || false;
  }

  public get displayIcon(): boolean {
    return this.feedbackMessageParameters?.displayIcon || false;
  }

  public get displayTitle(): boolean {
    return this.feedbackMessageParameters?.displayTitle || false;
  }

  public get iconName(): string | undefined {
    return this.feedbackMessageParameters?.iconName;
  }

  public get message(): string | undefined {
    return this.feedbackMessageParameters?.message;
  }

  public get title(): string | undefined {
    return this.feedbackMessageParameters?.title;
  }
}
