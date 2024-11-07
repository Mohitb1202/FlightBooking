import { Component,OnInit } from '@angular/core';
import { IFlight } from '../FlightBooking-interfaces/Flight';
import { FlightService } from '../FlightBooking-services/Flight-services/flight.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent implements OnInit {
  flights: IFlight[] = [];
  errormsg: string[] = [];
  constructor(private _flightService: FlightService) { }

  ngOnInit() {
    this.getFlightDetails();
  }
  getFlightDetails() {
    this._flightService.getFlightDetails().subscribe(
      responseFlightData => {
        this.flights = responseFlightData;
        console.log(this.flights);

      },
      responseErrorData => {
        this.errormsg = responseErrorData;
        console.log(this.errormsg);
      }
    )

  }
}
