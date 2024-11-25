import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { name: 'admin', password: '123', roles: ['ADMIN'], email: 'admin@gmail.com',points:0 },
    { name: 'ahmed', password: '123', roles: ['USER'], email: 'ahmedmejrissi@gmail.com', cardCode: '1234',points:200 },
    { name: 'john', password: '456', roles: ['USER'], email: 'john.doe@gmail.com', cardCode: '8765',points:0 },
  ];


  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles?: string[];

  constructor(private router: Router) {}

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  SignIn(user: User): boolean {
    let validUser: boolean = false;
    this.users.forEach((curUser) => {
      if (user.name === curUser.name && user.password === curUser.password) {
        validUser = true;
        this.loggedUser = curUser.name;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  isAdmin(): boolean {
    return this.roles ? this.roles.includes('ADMIN') : false;
  }

  addPoints(amount: number): void {
    const user = this.users.find((u) => u.name === this.loggedUser);
    if (user) {
      user.points += amount;
      console.log(`Added ${amount} points. Total points: ${user.points}`);
    }
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.name === username) {
        this.roles = curUser.roles;
      }
    });
  }


  validateCardCode(cardCode: string): boolean {
    return this.users.some((user) => user.cardCode === cardCode);
  }
}
