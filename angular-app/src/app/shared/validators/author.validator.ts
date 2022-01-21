import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyLatinSymbAndNums(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[a-zA-Z0-9]*$/
        const res = reg.test(control.value)
        
        if(res){
            return null;
        }else{
            return {
                notALatinSymbOrNum: { valid: false }
            }
        }
    }
}