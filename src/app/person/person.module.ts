import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BreadcrumbsModule } from '../shared/components/breadcrumbs/breadcrumbs.module';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonEditionPageComponent } from './components/person-edition-page/person-edition-page.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [PersonDetailsPageComponent, PersonEditionPageComponent],
  imports: [BreadcrumbsModule, CommonModule, HttpClientModule, PersonRoutingModule],
  providers: [PersonService],
})
export class PersonModule {}
