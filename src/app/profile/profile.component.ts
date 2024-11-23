import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent  implements OnInit{
  currentUser!: User;
  cardCode: string = '';
  amount: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const loggedUserName = this.authService.loggedUser;
    this.currentUser = this.authService.users.find(
      (user) => user.name === loggedUserName
    )!;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  processPayment(): void {
    if (!this.authService.validateCardCode(this.cardCode)) {
      this.errorMessage = 'Invalid card code. Please try again.';
      this.successMessage = '';
      return;
    }

    if (this.amount <= 0) {
      this.errorMessage = 'Invalid amount. Please enter a positive number.';
      this.successMessage = '';
      return;
    }

    // Calculate the points based on 10 dinars for 100 points
    const pointsToAdd = Math.floor((this.amount / 10) * 100);

    if (pointsToAdd <= 0) {
      this.errorMessage = 'Insufficient amount to buy points. Minimum is 10 dinars.';
      this.successMessage = '';
      return;
    }

    // Add the points to the user's account
    this.authService.addPoints(pointsToAdd);
    this.loadUserProfile();

    this.cardCode = '';
    this.amount = 0;

    this.successMessage = `Payment successful! You have received ${pointsToAdd} points.`;
    this.errorMessage = '';
  }





}
