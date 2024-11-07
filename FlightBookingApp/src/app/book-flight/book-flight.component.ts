import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IFlightBook } from '../FlightBooking-interfaces/FlightBook';
import { FlightService } from '../FlightBooking-services/Flight-services/flight.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  bookFlightForm!: FormGroup;
  errormsg: string[] = [];
  newBooking: string[] = [];

  constructor(private _flightService: FlightService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.bookFlightForm = this.formbuilder.group({
      passengerName: [""],
      noOfTickets: 0,
      totalAmount: 0,
      flightId: [""]
    });

  }
  submitForm(form: FormGroup) {
    this._flightService.bookFlight(form.value.passengerName, form.value.noOfTickets
      , form.value.totalAmount, form.value.flightId).subscribe(
        responsebookFlightData => {
          if (responsebookFlightData) {
            this.newBooking = responsebookFlightData;
            console.log(this.newBooking);
            alert("Your Flight is booked");
            this.router.navigate(['viewBookings']);

          }
        },
        responsebookErrorData => {
          this.errormsg = responsebookErrorData,
            console.log(this.errormsg);
            alert("Your Flight is booked");
        }
      )
  }

}
