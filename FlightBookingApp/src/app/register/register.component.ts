import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../FlightBooking-services/user-services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  status: string[] = [];

  constructor(private _userService:UserService,private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.RegisterForm = this.formbuilder.group({
      userName: [""],
      emailId: [""],
      contactNumber: [""],
      password: [""],
      gender:[""]
    });

  }
  submitForm(form:FormGroup) {
    this._userService.register(form.value.userName, form.value.emailId, form.value.contactNumber, form.value.password, form.value.gender).subscribe(
      responseRegisterData => {
        this.status = responseRegisterData;
        console.log(this.status);
        alert("Registration Successful")
      }
    )
  }

}
