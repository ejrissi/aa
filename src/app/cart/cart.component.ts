import { Article } from './../model/article.model';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Article[] = [];
  clothes: Article[] = [];
  totalPrice: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
  item?:Article;
  constructor(private service: ServiceService, private authService: AuthService) {
    console.log('' +this.cart);
  }

  ngOnInit(): void {
    this.cart = this.service.getCart();

    this.totalPrice = this.service.getTotalPrice();
  }

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




    this.authService.addPoints(-this.totalPrice);
    this.service.clearCart();



    this.cart = [];
    this.totalPrice = 0;

    this.successMessage = `Payment successful! You have spent ${this.totalPrice} points.`;
    this.service.DeleteArticle(Number(this.cart[0].id)).subscribe(() => {

    this.chargerArticle();})



    this.errorMessage = '';
  }

  chargerArticle() {
    this.service.getArticles().subscribe((prods) => {
      console.log(prods);
      this.clothes = prods;
    });
  }

  clearCart(): void {
    this.service.clearCart();
    this.cart = [];
    this.totalPrice = 0;
  }
}
