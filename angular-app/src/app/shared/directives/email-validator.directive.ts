import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator{

  validate(formControl: AbstractControl): ValidationErrors | null {

    if(formControl.value !== null && formControl.value !== ''){
      let reg = /^[a-zA-Z]+@(gmail.com|ukr.net|email.com)$/;

      if(formControl.value.length > 30){
        return {
          maxSymbols: { valid: false }  // return err if email got big num of symb
        }
      }

      if(reg.test(formControl.value)){
        
        return null; // return null if value is ok
      }else{
        return {
          emailvalidator: { valid: false } // return err if value is bad
        };
      }

    }else{
      return null; // return null if value is null
    }
  
  };
}
