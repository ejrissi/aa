import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur=0;
  constructor(private authService:AuthService,private router: Router) {}
  ngOnInit(): void {}

  onLoggedin() {
    console.log(this.user);
    const isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) {
      this.router.navigate(['/profile']);
    } else {
      this.erreur = 1;
    }
  }


}
