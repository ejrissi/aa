import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ADDComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { contactGuard } from './contact.guard';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'article',component:ArticleComponent},
  {path:'shop',component:ShopComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'add',component:ADDComponent },
  {path:'login',component:LoginComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
