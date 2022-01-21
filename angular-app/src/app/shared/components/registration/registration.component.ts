import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

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
  formSubscr!: Subscription;

  ngOnInit(): void {
    this.regForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(6)]),
      "email": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required])
    });

    this.formSubscr = this.regForm.valueChanges.subscribe(value => {
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
      alert("Registrated");
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
    this.formSubscr.unsubscribe();
  }
}
