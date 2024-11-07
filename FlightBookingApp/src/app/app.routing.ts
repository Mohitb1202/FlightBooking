import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'viewFlights', component: ViewFlightsComponent },
  { path: 'bookFlight', component: BookFlightComponent },
  { path: 'viewBookings', component: ViewBookingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path:'updateBooking/:bookingId/:passengerName/:noOfTickets/:totalAmount/:flightId',component:UpdateBookingComponent},
]

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
