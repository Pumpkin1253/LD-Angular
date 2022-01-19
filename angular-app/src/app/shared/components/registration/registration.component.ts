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

  onSubmit(value: any){
    this.isSubmitBtnPressed = true;

    this.nameField = value.name;
    this.emailField = value.email;
    this.passwordField = value.password;

    if(this.regForm.valid){
      alert("Registrated");
    }

  }

  passwordEyeClick(){
    if(this.eyeIcon === faEye){ // show password
      this.eyeIcon = faEyeSlash
      this.isPasswordHidden = false;
      
    }else{ // hide password
      this.eyeIcon = faEye
      this.isPasswordHidden = true;
    }
  }

  ngOnDestroy(): void{
    this.formSubscr.unsubscribe();
  }
}
