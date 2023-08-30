import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from './services/person.service';
import { PersonEditionPageComponent } from './components/person-edition-page/person-edition-page.component';

@NgModule({
  declarations: [PersonDetailsPageComponent, PersonEditionPageComponent],
  imports: [CommonModule, HttpClientModule, PersonRoutingModule],
  providers: [PersonService],
})
export class PersonModule {}
