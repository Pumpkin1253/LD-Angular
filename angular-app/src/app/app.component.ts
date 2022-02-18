import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { AuthStateFacade } from './auth/store/auth.facade';
import { UserService } from './user/services/user.service';
import { UserStateFacade } from './user/store/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'component-hw';

  public userState = new UserStateFacade(this.store$, this.actions$, this.userService);
  public authState = new AuthStateFacade(this.store$, this.actions$, this.authService, this.userService);

  destroy$ = new Subject();
  
  constructor(
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private userService: UserService,
    private store$: Store,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    // this.userState.getCurrentUser();
    this.authState.updateIsAuthorized(); // the same method as getCurrentUser, but for updating isAuthorized state
  }

  btnClick() {
    this.authState.isAuthorized$
    .pipe(takeUntil(this.destroy$))
    .subscribe(state=>{
      
      if(state){
        this.sessionStorageService.deleteToken();
        this.authState.logout();
        this.userState.getCurrentUser(); // to change state by failing req
      }
    })
  }
}
