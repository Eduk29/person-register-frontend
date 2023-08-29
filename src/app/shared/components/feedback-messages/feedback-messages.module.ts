import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FeedbackMessagesComponent } from './feedback-messages.component';
import { FeedbackMessageService } from './services/feedback-message.service';

@NgModule({
  declarations: [FeedbackMessagesComponent],
  imports: [CommonModule, MatIconModule],
  exports: [FeedbackMessagesComponent],
  providers: [FeedbackMessageService],
})
export class FeedbackMessagesModule {}
