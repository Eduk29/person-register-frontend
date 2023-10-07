import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { BreadcrumbsModule } from '../shared/components/breadcrumbs/breadcrumbs.module';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonEditionPageComponent } from './components/person-edition-page/person-edition-page.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [PersonDetailsPageComponent, PersonEditionPageComponent, PersonFormComponent],
  imports: [
    BreadcrumbsModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    PersonRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [PersonService],
})
export class PersonModule {}
