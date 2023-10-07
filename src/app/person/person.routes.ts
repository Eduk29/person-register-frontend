import { Routes } from '@angular/router';

import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonEditionPageComponent } from './components/person-edition-page/person-edition-page.component';

export const PERSON_BASE_ROUTES: Routes = [
  { path: ':id', component: PersonDetailsPageComponent },
  { path: ':id/edit', component: PersonEditionPageComponent },
  { path: '**', redirectTo: '../error/not-found', pathMatch: 'full' },
];
