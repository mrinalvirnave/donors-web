import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { AddDonorComponent } from './add-donor/add-donor.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginActivateGuard } from './login-activate.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DonorsListComponent,
    DonorDetailComponent,
    AddDonorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
