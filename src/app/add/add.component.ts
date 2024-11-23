import { Component } from '@angular/core';

import { Article } from '../model/article.model';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ADDComponent {
  newArticle: Article = {
    id: 0,
    taille: '',
    desc: '',
    etat: '',
    prix: 0,
    photo: []
  };
  selectedPhotos: string[] = [];

  constructor(private service:ServiceService,private r:Router) {}

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedPhotos.push(e.target.result); 
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  addArticle(): void {
    this.newArticle.id = this.service.clothes.length + 1;
    this.newArticle.photo = [...this.selectedPhotos];
    this.service.clothes.push({ ...this.newArticle });
    this.resetForm();
    this.r.navigate(['/shop']);

  }

  resetForm(): void {
    this.newArticle = {
      id: 0,
      taille: '',
      desc: '',
      etat: '',
      prix: 0,
      photo: []
    };
    this.selectedPhotos = [];
  }
}
