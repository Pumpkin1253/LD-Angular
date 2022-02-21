import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  isSubmitBtnPressed: boolean = false; //to avoid errs 'required' as component loads

  nameField!: string; 
  emailField!: string;
  passwordField!: string;
  isPasswordHidden: boolean = true;

  regForm!: FormGroup;

  fieldsAreWrong: boolean = false; // backend responce state

  public authState = new AuthStateFacade(this.store$, this.actions$, this.authService, this.userService);

  destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store$: Store,
    private actions$: Actions
  ){}

  ngOnInit(): void {
    setTimeout(()=>{
      this.regForm.setValue({
        name: "testtest",
        email:"test@email.com",
        password:"password"
      })
    }, 0); // to autocomplete registration fields

    this.regForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(6)]),
      "email": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required, Validators.minLength(6)])
    });

    this.regForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.nameField = value.name;
      this.emailField = value.email;
      this.passwordField = value.password;
    }); 
  }

  onSubmit(value: any): void{
    this.isSubmitBtnPressed = true;

    this.nameField = value.name;
    this.emailField = value.email;
    this.passwordField = value.password;

    if(this.regForm.valid){
      let user: User = {
        "name": this.nameField,
        "email": this.emailField,
        "password":this.passwordField
      };
      this.authState.register(user);

      this.authState.getErrorMessage$.subscribe(data=>{
        if(!data){ // no errs
          this.fieldsAreWrong = false;
          this.router.navigate(['/login']);
        }else{
          this.fieldsAreWrong = true;
        }
      })
    }
  }

  isNameValid(): boolean{
    return (!this.nameField && this.isSubmitBtnPressed) || (!this.nameField && this.regForm.get('name')?.touched) 
    || this.regForm.get('name')?.hasError('minlength')!;
  }

  isEmailValid(): boolean{
    return (!this.emailField && this.isSubmitBtnPressed) || (!this.emailField && this.regForm!.get('email')?.touched)
    || this.regForm.get('email')?.hasError('emailvalidator') || this.regForm.get('email')?.hasError('maxSymbols')!; 
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
