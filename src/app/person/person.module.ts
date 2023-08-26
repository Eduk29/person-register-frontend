import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PersonService } from './services/person.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [PersonService],
})
export class PersonModule {}
