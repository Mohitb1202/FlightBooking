import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FlightService } from '../FlightBooking-services/Flight-services/flight.service';
import { UserService } from '../FlightBooking-services/user-services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  status: string = "";
  msg: string = "";
  checkStatus: boolean=false;
  errorMsg: string[] = [];

  constructor(private formbuilder:FormBuilder, private _userService:UserService,private router:Router) { }

  ngOnInit() {
    this.LoginForm = this.formbuilder.group({
      emailId: [""],
      password: [""],
    });

  }
  submitForm(form: FormGroup) {
    this._userService.ValidateLogin(form.value.emailId, form.value.password).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus.toString();
        if (this.status != "invalid credentials") {
          sessionStorage.setItem('userName', this.status);
          console.log(this.status);
          alert("Login successful");
          this.router.navigate(['/home']);
        }
        else {
          this.checkStatus = true;
          this.msg = "Try with valid credentials";

        }
        
      },
      responseErrorStatus => {
        this.errorMsg = responseErrorStatus;
        console.log(this.errorMsg);
      }
      
    )

  }

}
