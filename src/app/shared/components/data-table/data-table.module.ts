import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { NoResultsModule } from '../no-results/no-results.module';
import { TableActionsModule } from '../table-actions/table-actions.module';
import { DataTableComponent } from './data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, MatCardModule, MatPaginatorModule, MatTableModule, NoResultsModule, TableActionsModule],
  exports: [DataTableComponent],
})
export class DataTableModule {}
