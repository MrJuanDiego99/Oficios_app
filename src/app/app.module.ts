import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar esto

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    RouterOutlet,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
