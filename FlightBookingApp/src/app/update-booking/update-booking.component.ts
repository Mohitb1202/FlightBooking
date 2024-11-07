import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FlightService } from '../FlightBooking-services/Flight-services/flight.service';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit{
  bookingId: number = 0;
  passengerName: string = "";
  noOfTickets: number = 0;
  totalAmount: number = 0;
  flightId: string = "";
  status: string[] = [];
  errormsg: string = "";

  constructor(private route:ActivatedRoute,private _flightService:FlightService,private router:Router) { }

  ngOnInit() {
    this.bookingId = parseInt(this.route.snapshot.params['bookingId']);
    this.passengerName = this.route.snapshot.params['passengerName'];
    this.noOfTickets = parseInt(this.route.snapshot.params['noOfTickets']);
    this.totalAmount = parseInt(this.route.snapshot.params['totalAmount']);
    this.flightId = this.route.snapshot.params['flightId'];
    console.log(this.totalAmount); 
  }

  submitForm(noOfTickets:number) {
    this._flightService.updateBooking(this.bookingId, this.passengerName, noOfTickets, this.totalAmount, this.flightId).subscribe(
        responseUpdateData => {
          this.status = responseUpdateData;
        console.log(this.status);
        alert("Update successful");
          this.router.navigate(['viewBookings'])
        },
        responseErrorData => {
          this.errormsg = responseErrorData;
          console.log(this.errormsg);
        }
    )
  }
    

}
