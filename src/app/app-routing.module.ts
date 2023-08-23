import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_ROUTES } from './app.routes';

const routes: Routes = APP_BASE_ROUTES;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
