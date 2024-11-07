import { Component, OnInit } from '@angular/core';
import { FlightService } from '../FlightBooking-services/Flight-services/flight.service';
import { IFlightBook } from '../FlightBooking-interfaces/FlightBook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  bookings: IFlightBook[] = [];
  errormsg: string[] = [];
  cancellation: string[] = [];
  constructor(private _flightService:FlightService,private router:Router) { }

  ngOnInit() {
    this.getBookingDetails();
  }
  getBookingDetails() {
    this._flightService.getBookingDetails().subscribe(
      responseBookingData => {
        this.bookings = responseBookingData;
        console.log(this.bookings);
      },
      responseBookingError => {
        this.bookings = [];
        this.errormsg = responseBookingError;
        console.log(this.errormsg);
      });
  }
  updateDetails(pas: IFlightBook) {
    this.router.navigate(['/updateBooking', pas.bookingId, pas.passengerName, pas.noOfTickets, pas.totalAmount, pas.flightId]);
  }

  cancelBooking(book: IFlightBook) {
    this._flightService.cancelBooking(book.bookingId, book.passengerName, book.noOfTickets, book.totalAmount, book.flightId).subscribe(
      responseCancelData=>{
        this.cancellation = responseCancelData;
        console.log(this.cancellation);
        alert('your booking is cancelled');
        
      }
    )
  }

  }



