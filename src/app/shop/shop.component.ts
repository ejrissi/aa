import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Article } from '../model/article.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  clothes: Article[] = []; // All articles
  filteredArticles: Article[] = []; // Articles after filtering
  searchQuery: string = ''; // User's search input

  showButtons: boolean[] = [];
  showDetails: boolean[] = [];
  currentImageIndex: number[] = [];

  constructor(private serviceService: ServiceService, public authService: AuthService) {}

  ngOnInit(): void {
    // Load all articles from the service
    this.clothes = this.serviceService.clothes;
    this.filteredArticles = [...this.clothes]; // Initially show all articles
    this.currentImageIndex = new Array(this.clothes.length).fill(0); // Initialize image indices
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Filter articles by description
      this.filteredArticles = this.serviceService.getArticlesByDesc(this.searchQuery);
    } else {
      // Reset to show all articles if the search is cleared
      this.filteredArticles = [...this.clothes];
    }
  }

  addToCart(item: Article): void {
    this.serviceService.addToCart(item);
  }

  deleteArticle(index: number): void {
    this.filteredArticles.splice(index, 1);
    this.clothes.splice(index, 1); // Update the main array as well
  }

  previousImage(index: number): void {
    this.currentImageIndex[index] =
      (this.currentImageIndex[index] - 1 + this.filteredArticles[index].photo.length) %
      this.filteredArticles[index].photo.length;
  }

  nextImage(index: number): void {
    this.currentImageIndex[index] =
      (this.currentImageIndex[index] + 1) % this.filteredArticles[index].photo.length;
  }
}
