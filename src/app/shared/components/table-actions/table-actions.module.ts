import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TableActionsService } from './services/table-actions.service';
import { TableActionsComponent } from './table-actions.component';

@NgModule({
  declarations: [TableActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [TableActionsComponent],
  providers: [TableActionsService],
})
export class TableActionsModule {}
