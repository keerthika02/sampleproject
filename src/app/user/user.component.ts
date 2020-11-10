import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }
  UserDetails
  profile='assets/profile.svg'
  ngOnInit() {
    this.UserDetails = JSON.parse(localStorage.getItem('registrationDetails'))
    this.profile = this.UserDetails.profile
    console.log(this.UserDetails)
  }

}
