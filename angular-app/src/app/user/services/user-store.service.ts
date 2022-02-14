import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  public isAdmin!: boolean;
  name!: string;

  constructor(private userService: UserService) { 
  }

  getUser(){
    return this.userService.getUser()
    .pipe(map(data => {
      if(data != null){
        let user = data.result;

        if(user.role == "admin"){
          this.isAdmin = true;
          this.isAdmin$$.next(true);
        }else{
          this.isAdmin = false;
          this.isAdmin$$.next(false);
        }
        
        this.name = user.name;
        return user;
      }else{
        return null;
      }
    }));
  }

}
