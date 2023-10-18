import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpService, private router: Router) { }

  loginForm = {
    username: null,
    password: null
  }

  error = "";

  login() {
    this.http.login(this.loginForm).subscribe(result => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("profile", JSON.stringify(result.profile))
      this.router.navigate(['/dashboard']);
    }, err => {
      this.error = err.message
    })
  }

}