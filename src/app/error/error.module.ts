import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
