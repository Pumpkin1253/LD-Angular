import { Directive,  ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPassword]',
  exportAs: 'appPassword',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordDirective,
      multi: true
    }
  ]
})
export class PasswordDirective implements Validator{
  isPasswordType: boolean = true;

  constructor(private el: ElementRef) {
  }
  
  validate(formControl: AbstractControl): ValidationErrors | null {
    
    if(formControl.value !== null && formControl.value !== ''){
      if(formControl.value.length < 6){
        return {
          minSymbols: { valid: false }  // return err if pass got few nums of symbs
        }
      }else{
        return null; // return null if value is ok
      }

    }else{
      return null; // return null if value is null
    }
  
  };

  onToggle(){
    this.el.nativeElement.type =  this.isPasswordType ? "text" : "password";
    this.isPasswordType = !this.isPasswordType;  
  }
  

}
