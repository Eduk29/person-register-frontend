import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './shared/components/navbar/navbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, NavbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
