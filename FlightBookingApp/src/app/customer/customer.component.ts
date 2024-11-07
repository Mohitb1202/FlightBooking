import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  userName: string = "";

  constructor(private router:Router) {
    this.userName = <string>sessionStorage.getItem('userRole');
  }

  ngOnInit() {

  }
  logOut() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['/home']);
  }

}
