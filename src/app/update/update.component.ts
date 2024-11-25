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
    this.service.getArticleById(this.route.snapshot.params['id']).
    subscribe( prod =>{ this.article = prod; } ) ;

  }

  updateArticle(): void {
    this.service.updateArticle(this.article).subscribe(prod =>{
      this.router.navigate(['/shop']);  });




}


}
