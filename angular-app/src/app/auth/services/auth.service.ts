import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorised$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthorised$: Observable<boolean> = this.isAuthorised$$.asObservable();
  public isAuthorised: boolean = false;

  constructor(private http: HttpClient, sessionStorageService: SessionStorageService) {
    if(sessionStorageService.getToken() != ""){
      this.isAuthorised = true;
    }else{
      this.isAuthorised = false;
    }
   }

  register(user: User){
    return this.http.post<any>("http://localhost:3000/register", user)
    .pipe(map(data => data.result));
  }

  login(user: User){
    this.isAuthorised = true;
    return this.http.post<any>("http://localhost:3000/login", user)
    .pipe(map(data => data.result));
  }

  logout(){
    this.isAuthorised = false;
    return this.http.delete<any>("http://localhost:3000/logout");
  }
}
