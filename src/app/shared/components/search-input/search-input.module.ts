import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SearchInputComponent } from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatSelectModule, MatButtonModule, MatIconModule],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
