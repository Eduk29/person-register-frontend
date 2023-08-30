import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PERSON_BASE_ROUTES } from './person.routes';

const routes: Routes = PERSON_BASE_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
