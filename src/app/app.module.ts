import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { MessagesModule } from './messages/messages.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    MessagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
