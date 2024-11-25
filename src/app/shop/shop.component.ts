import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Article } from '../model/article.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  clothes: Article[] = [];
  filteredArticles: Article[] = [];
  searchQuery: string = '';

  showButtons: boolean[] = [];
  showDetails: boolean[] = [];
  currentImageIndex: number[] = [];

  constructor(
    private serviceService: ServiceService,
    public authService: AuthService
  ) {}

  chargerArticle() {
    this.serviceService.getArticles().subscribe((prods) => {
      console.log(prods);
      this.clothes = prods;
    });
  }

  ngOnInit(): void {
    this.chargerArticle();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredArticles = this.serviceService.getArticlesByDesc(
        this.searchQuery
      );
    } else {
      this.filteredArticles = [...this.clothes];
    }
  }

  addToCart(item: Article): void {
    this.serviceService.addToCart(item);
  }

  deleteArticle(p: Article): void {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.serviceService.DeleteArticle(Number(p.id)).subscribe(() => {
        console.log('produit supprimé');
        this.chargerArticle();
      });
  }

  previousImage(index: number): void {
    this.currentImageIndex[index] =
      (this.currentImageIndex[index] -
        1 +
        this.filteredArticles[index].photo.length) %
      this.filteredArticles[index].photo.length;
  }

  nextImage(index: number): void {
    this.currentImageIndex[index] =
      (this.currentImageIndex[index] + 1) %
      this.filteredArticles[index].photo.length;
  }
}
