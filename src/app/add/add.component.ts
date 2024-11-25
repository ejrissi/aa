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

   
    taille: '',
    description: '',
    etat: '',
    prix: 0,
    photo: ''
  };
  selectedPhoto!: string;

  constructor(private service:ServiceService,private r:Router) {
    console.log(this.newArticle);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedPhoto ='assets/'+input.files[0].name;
    }
  }


  addArticle(): void {
    if (this.selectedPhoto) {
      this.newArticle.photo = this.selectedPhoto;
      this.service.addArticle(this.newArticle).subscribe(() => {
        alert('Article added successfully!');
        this.resetForm();
        this.r.navigate(['/shop']);
      });
    } else {
      alert('Please select an image!');
    }
  }

  resetForm(): void {
    this.newArticle = {

      taille: '',
      description: '',
      etat: '',
      prix: 0,
      photo: ''
    };
    this.selectedPhoto = '';
  }
}
