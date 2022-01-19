import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyLatinSymbAndNums(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let reg = /^[a-zA-Z0-9]*$/
        let res = reg.test(control.value)
        
        if(res){
            return null;
        }else{
            return {
                notALatinSymbOrNum: { valid: false }
            }
        }
    }
}