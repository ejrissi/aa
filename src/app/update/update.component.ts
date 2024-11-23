import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { Article } from '../model/article.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  article!: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.article = this.service.getArticleById(+id)!; // Assurez-vous que le service retourne l'article correct
    }
  }

  updateArticle(): void {
    this.service.updateArticle(this.article);
    this.router.navigate(['/shop']); // Redirige vers la liste des articles
  }
}
