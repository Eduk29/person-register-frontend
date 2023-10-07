import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ERROR_ROUTES } from './error.routes';

const routes: Routes = ERROR_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
