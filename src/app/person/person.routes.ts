import { Routes } from '@angular/router';

import { PersonCreatePageComponent } from './components/person-create-page/person-create-page.component';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonEditionPageComponent } from './components/person-edition-page/person-edition-page.component';

export const PERSON_BASE_ROUTES: Routes = [
  { path: 'new', component: PersonCreatePageComponent, pathMatch: 'full' },
  { path: ':id', component: PersonDetailsPageComponent, pathMatch: 'full' },
  { path: ':id/edit', component: PersonEditionPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '../error/not-found', pathMatch: 'full' },
];
