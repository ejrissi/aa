import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Article } from './model/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wear';
  constructor (public authService: AuthService,private router:Router) {}

  clothes!: Article[];
  onLogout()
  {
    this.authService.logout();
  }

  ngOnInit () {
    let isloggedin: string |null;
    let loggedUser:string|null;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin!="true" || !loggedUser)
    this.router.navigate(['/login']);
    else
    this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }

    getArticlesByDesc(searchTerm: string): Article[] {
      return this.clothes.filter(article =>
        article.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );

    }


}
