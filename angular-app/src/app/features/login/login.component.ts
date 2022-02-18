import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { AuthorModel } from 'src/app/shared/models/author';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/user/services/user.service';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    './../registration/registration.component.css']
})
export class LoginComponent implements OnInit {

  authors!: AuthorModel[];

  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  isSubmitBtnPressed: boolean = false; //to avoid errs 'required' as component loads

  emailField!: string;
  passwordField!: string;
  isPasswordHidden: boolean = true;

  fieldsAreWrong: boolean = false; // backend responce state

  @ViewChild('loginForm', { static: true }) loginForm!: NgForm; // for subscribing

  public authState = new AuthStateFacade(this.store$, this.actions$, this.authService, this.userService);
  public userState = new UserStateFacade(this.store$, this.actions$, this.userService);

  destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private store$: Store,
    private actions$: Actions) {
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loginForm.setValue({
        email: "admin@email.com",
        password: "admin123"
      })
    }, 0); // to autocomplete login fields

    this.loginForm.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.emailField = value.email;
        this.passwordField = value.password;
      });
  }


  onSubmit(value: any): void {
    this.isSubmitBtnPressed = true;

    this.emailField = value.email;
    this.passwordField = value.password;

    if (this.loginForm.valid) {
      let user: User = {
        "email": this.emailField,
        "password": this.passwordField
      };

      this.authState.login(user);
      this.authState.getToken$
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: token => {
            if (token) {
              this.fieldsAreWrong = false;
              this.sessionStorageService.setToken(token);
              this.router.navigate(['/courses']);
            }
          },
          error: err => {
            this.fieldsAreWrong = true;
          }
        })
    }
  }

  isEmailValid(emailInput: any): boolean {
    return (!this.emailField && this.isSubmitBtnPressed) || (!this.emailField && emailInput.touched)
      || emailInput.hasError('emailvalidator') || emailInput.hasError('maxSymbols');
  }

  isPasswordValid(passwInput: any): boolean {
    return (!this.passwordField && this.isSubmitBtnPressed) || (!this.passwordField && passwInput.touched)
      || passwInput.hasError('minSymbols');
  }

  ngOnDestroy(): void {
    this.userState.getCurrentUser();

    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
