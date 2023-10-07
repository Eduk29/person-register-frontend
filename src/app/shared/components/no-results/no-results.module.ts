import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NoResultsComponent } from './no-results.component';

@NgModule({
  declarations: [NoResultsComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [NoResultsComponent],
})
export class NoResultsModule {}
