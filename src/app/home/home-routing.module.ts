import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HOME_ROUTES } from './home.routes';

const routes: Routes = HOME_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
