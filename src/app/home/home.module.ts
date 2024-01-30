import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PersonModule } from '../person/person.module';
import { DataTableModule } from '../shared/components/data-table/data-table.module';
import { FeedbackMessagesModule } from '../shared/components/feedback-messages/feedback-messages.module';
import { SearchInputModule } from '../shared/components/search-input/search-input.module';
import { TableActionsModule } from '../shared/components/table-actions/table-actions.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    DataTableModule,
    FeedbackMessagesModule,
    HomeRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    PersonModule,
    SearchInputModule,
    TableActionsModule,
  ],
})
export class HomeModule {}
