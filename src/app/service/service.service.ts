import { Article } from './../model/article.model';
import { Injectable, ɵɵtextInterpolate7 } from '@angular/core';


import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {

headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiURL: string = 'http://localhost:8081/articles/api';

  item?:Article;
  clothes!: Article[];
  cart: Article[] = [];
  // constructor() {

  //   this.clothes = [
  //     {
  //       id: 1,
  //       taille: 'M',
  //       desc: 'Coat',
  //       prix: 100,
  //       photo: ['assets/one.png', 'assets/two.png'],
  //       etat: 'good'
  //     },
  //     {
  //       id: 2,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/three.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 4,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/five.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 5,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/six.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 6,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/seven.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/eight.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/nine.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/eleven.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/f.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/ff.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/fff.webp'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Coat',
  //       prix: 150,
  //       photo: ['assets/ffff.png'],
  //       etat: 'excellent'
  //     },
  //     {
  //       id: 3,
  //       taille: 'L',
  //       desc: 'Jacket',
  //       prix: 150,
  //       photo: ['assets/f2.png'],
  //       etat: 'excellent'
  //     }
  //   ];
  // }

  constructor(private http: HttpClient){

  }


  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiURL);

  }

  addArticle( prod: Article):Observable<Article>{
    console.log(prod);
    return this.http.post<Article>(this.apiURL, prod, httpOptions);
    }


    DeleteArticle(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }

  getArticleById(id: number): Observable<Article>{
    const url = `${this.apiURL}/${id}`;
     return this.http.get<Article>(url);
  }

  updateArticle(updatedArticle: Article): Observable<Article>
  {
    return this.http.put<Article>(this.apiURL, updatedArticle, httpOptions);
  }



  addToCart(item: Article): void {
    this.cart.push(item);
    this.item=item;

  }

  tItem(itemm: Article):Article
  {

    return itemm;

  }

  getCart(): Article[] {

    return this.cart;
  }


  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.prix, 0);
  }


  clearCart(): void {
    this.cart = [];
  }

  getArticlesByDesc(searchTerm: string): Article[] {
    return this.clothes.filter(article =>
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }



}
