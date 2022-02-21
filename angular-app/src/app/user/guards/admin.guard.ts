import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserStoreService } from '../services/user-store.service';
import { UserService } from '../services/user.service';
import { UserStateFacade } from '../store/user.facade';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  adminState!: boolean;

  private userState = new UserStateFacade(this.store$, this.actions$, this.userService);

  constructor(
    private userStoreService: UserStoreService,
    private store$: Store,
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {
    this.userState.isAdmin$.subscribe(data=>{
      this.adminState = data
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let roleState = this.userStoreService.isAdmin;

    if (this.adminState) { // states isAdmin always are late for the guard
      return true;
    } else {
      return true;
      // return this.router.createUrlTree(["/courses"]);
    }
  }

}
