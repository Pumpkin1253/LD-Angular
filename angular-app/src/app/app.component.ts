import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { UserStoreService } from './user/services/user-store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'component-hw';
  btnText: string = "Login";
  userName: string = "";
  href: string = "/login";

  destroy$ = new Subject();

  constructor(
    private userStoreService: UserStoreService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,

  ){}

  ngOnInit(): void {
    this.userStoreService.getUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: user =>{
        this.btnText = "Logout";
        this.userName = user.name;
        this.href = "/courses";
      },
      error: err=>{
        this.btnText = "Login";
        this.userName = "";
        this.href = "/login";
      }
    });
  }

  btnClick(){
    if(this.authService.isAuthorised){ // check if user login
      this.sessionStorageService.deleteToken();
      this.authService.logout() // logout him
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        console.log(data);
        this.btnText = "Login";
        this.userName = "";
        this.href = "/login";
      });
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
