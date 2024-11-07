import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IFlightBook } from '../../FlightBooking-interfaces/FlightBook';
import { Observable, catchError, throwError } from 'rxjs';
import { IFlight } from '../../FlightBooking-interfaces/Flight';
import { IBookFlight } from '../../FlightBooking-interfaces/BookFlight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  getBookingDetails(): Observable<IFlightBook[]> {
    let tempvar = this.http.get<IFlightBook[]>
      ('https://localhost:7080/api/Flight/GetBookingDetails').pipe(catchError(this.errorHandler));;
    return tempvar;
  }

  getFlightDetails(): Observable<IFlight[]> {
    let tempvar = this.http.get<IFlight[]>
      ('https://localhost:7080/api/Flight/GetFlightDetails').pipe(catchError(this.errorHandler));;
    return tempvar;
  }

  bookFlight(passengerName: string, noOfTickets: number, totalAmount: number, flightId: string): Observable<string[]> {
    var bookObj: IBookFlight = { passengerName: passengerName, noOfTickets: noOfTickets, totalAmount: totalAmount, flightId: flightId };
    console.log(bookObj);
    return this.http.post<string[]>('https://localhost:7080/api/Flight/BookFlight', bookObj).pipe(catchError(this.errorHandler));
  }

  updateBooking(bookingId: number, passengerName: string, noOfTickets: number, totalAmount: number, flightId: string): Observable<string[]> {
    var bookUpdateObj: IFlightBook = { bookingId: bookingId, passengerName: passengerName, noOfTickets: noOfTickets, totalAmount: totalAmount, flightId: flightId };
    console.log(bookUpdateObj);
    return this.http.put<string[]>('https://localhost:7080/api/Flight/updateNoOfTickets', bookUpdateObj).pipe(catchError(this.errorHandler));
  }

  cancelBooking(bookingId: number, passengerName: string, noOfTickets: number, totalAmount: number, flightId: string): Observable<string[]> {
    var bookDelObj: IFlightBook = { bookingId: bookingId, passengerName: passengerName, noOfTickets: noOfTickets, totalAmount: totalAmount, flightId: flightId };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: bookDelObj };
    return this.http.delete<string[]>('https://localhost:7080/api/Flight/cancelBooking', httpOptions).pipe(catchError(this.errorHandler));
  }
    errorHandler(error: HttpErrorResponse) {
      console.error(error);
      return throwError(error.message || "Server Error");
    }
  }
