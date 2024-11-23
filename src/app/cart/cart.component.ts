import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Article } from '../model/article.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Article[] = [];
  totalPrice: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: ServiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cart = this.service.getCart(); // Get cart items from service
    this.totalPrice = this.service.getTotalPrice(); // Calculate total price
  }

  // Handle the payment of total points
  processPayment(): void {
    const userPoints = this.authService.users.find(
      (user) => user.name === this.authService.loggedUser
    )?.points;

    if (userPoints === undefined) {
      this.errorMessage = 'User not found.';
      return;
    }

    if (userPoints < this.totalPrice) {
      this.errorMessage = 'Insufficient points to complete the purchase.';
      this.successMessage = '';
      return;
    }

    // Deduct the total price from user's points
    this.authService.addPoints(-this.totalPrice);  // Subtract points from the user
    this.service.clearCart();  // Clear the cart after successful purchase
    this.cart = [];  // Clear cart items
    this.totalPrice = 0;  // Reset the total price

    this.successMessage = `Payment successful! You have spent ${this.totalPrice} points.`;
    this.errorMessage = '';
  }

  // Optionally, clear the cart
  clearCart(): void {
    this.service.clearCart();
    this.cart = [];
    this.totalPrice = 0;
  }
}
