import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  adminState!: boolean;

  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ){
    userStoreService.getUser().subscribe({
      next: user=>{
        this.adminState = user.role;
      },
      error: err=>{
        this.adminState = false
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let roleState =  this.userStoreService.isAdmin;
      
      if(this.adminState){ // states isAdmin always are be late for the guard
        return true;
      }else{  
        // return this.router.createUrlTree(["/courses"]);
         return true; // everyone can go by edit\add routes
      }
  }
  
}
