import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName: string = "";
  base: boolean = false;
  customer: boolean = false;

  constructor() {
    this.userName = <string>sessionStorage.getItem('userName');

    if (this.userName == null) {
      this.base = true;
    }
    else {
      this.customer = true;
    }
  }

}
