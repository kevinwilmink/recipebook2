import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';


/* Guard
  - guards can be used to block/guard access to a Component
    - see app-routing.module.ts
  - also add AuthGuard to app.module.ts
 */

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated();
  }
}
