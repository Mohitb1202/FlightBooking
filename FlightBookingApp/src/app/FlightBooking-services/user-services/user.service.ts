import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../FlightBooking-interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(userName: string, emailId: string, contactNumber: string,password:string,gender:string): Observable<string[]> {
    var regObj: IUser = { userName: userName, emailId: emailId, contactNumber: contactNumber, password:password,gender:gender};
    console.log(regObj);
    return this.http.post<string[]>('https://localhost:7080/api/Flight/Register', regObj).pipe(catchError(this.errorHandler));
  }

  ValidateLogin(emailId: string, password: string): Observable<string[]> {
    var logObj: IUser = { userName:"", emailId: emailId, contactNumber: "", password: password, gender:"" };
    console.log(logObj);
    return this.http.post<string[]>('https://localhost:7080/api/Flight/ValidateLogin', logObj).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
