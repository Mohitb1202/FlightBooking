import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './home/home.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { routing } from './app.routing';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewBookingsComponent,
    BaseComponent,
    HomeComponent,
    BookFlightComponent,
    ViewFlightsComponent,
    UpdateBookingComponent,
    RegisterComponent,
    LoginComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,HttpClientModule,routing,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
