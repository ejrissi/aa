import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';

export class contactGuard implements CanActivate {


  constructor (private authService: AuthService,private router : Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAdmin())
      return true;
      else
      {
      this.router.navigate(['app-forbidden']);
      return false;
      }
  }





}
