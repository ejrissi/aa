import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  clothes!: Article[];
  cart: Article[] = [];
  constructor() {

    this.clothes = [
      {
        id: 1,
        taille: 'M',
        desc: 'Coat',
        prix: 100,
        photo: ['assets/one.png', 'assets/two.png'],
        etat: 'good'
      },
      {
        id: 2,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/three.webp'],
        etat: 'excellent'
      },
      {
        id: 4,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/five.webp'],
        etat: 'excellent'
      },
      {
        id: 5,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/six.webp'],
        etat: 'excellent'
      },
      {
        id: 6,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/seven.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/eight.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/nine.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/eleven.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/f.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/ff.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/fff.webp'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Coat',
        prix: 150,
        photo: ['assets/ffff.png'],
        etat: 'excellent'
      },
      {
        id: 3,
        taille: 'L',
        desc: 'Jacket',
        prix: 150,
        photo: ['assets/f2.png'],
        etat: 'excellent'
      }
    ];
  }

  getArticleById(id: number): Article | undefined {
    return this.clothes.find(article => article.id === id);
  }

  updateArticle(updatedArticle: Article): void {
    const index = this.clothes.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.clothes[index] = updatedArticle;
    }
  }

  addToCart(item: Article): void {
    this.cart.push(item);
  }

  // Get the current cart items
  getCart(): Article[] {
    return this.cart;
  }

  // Calculate the total price of the cart
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.prix, 0);
  }

  // Clear the cart (optional)
  clearCart(): void {
    this.cart = [];
  }

  getArticlesByDesc(searchTerm: string): Article[] {
    return this.clothes.filter(article =>
      article.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }



}
