import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const ERROR_ROUTES: Routes = [
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '' },
];
