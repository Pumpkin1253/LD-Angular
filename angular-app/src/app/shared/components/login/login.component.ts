import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
   './../registration/registration.component.css']
})
export class LoginComponent implements OnInit {

  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  isSubmitBtnPressed: boolean = false; //to avoid errs 'required' as component loads

  emailField!: string;
  passwordField!: string;
  isPasswordHidden: boolean = true;

  formChangeSubscription!: Subscription;
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm; // for subscribing

  ngOnInit(): void {
    this.formChangeSubscription = this.loginForm.form.valueChanges.subscribe(value => {
      this.emailField = value.email;
      this.passwordField = value.password;
    })
  }

  onSubmit(value: any): void{
    this.isSubmitBtnPressed = true;
  
    this.emailField = value.email;
    this.passwordField = value.password;

    if(this.loginForm.valid){
      alert("Logged in");
    }
    
  }

  isEmailValid(emailInput: any): boolean{
    return (!this.emailField && this.isSubmitBtnPressed) || (!this.emailField && emailInput.touched)
    || emailInput.hasError('emailvalidator') || emailInput.hasError('maxSymbols');
  }

  ngOnDestroy(): void{
    this.formChangeSubscription.unsubscribe();
  }

}
