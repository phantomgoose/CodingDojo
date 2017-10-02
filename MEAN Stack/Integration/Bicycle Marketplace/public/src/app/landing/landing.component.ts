import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  login = {
    email: '',
    password: '',
  }

  registration = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
  }

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    console.log('sending form', this.registration);
    this._userService.register(this.registration, () => {
      this._router.navigate(['browse'])
    });
  }

}
