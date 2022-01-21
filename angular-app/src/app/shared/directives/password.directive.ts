import { Directive,  ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPassword]',
  exportAs: 'appPassword'
})
export class PasswordDirective {
  isPasswordType: boolean = true;

  constructor(private el: ElementRef) {
  }

  onToggle(){
    this.el.nativeElement.type =  this.isPasswordType ? "text" : "password";
    this.isPasswordType = !this.isPasswordType;  
  }
  

}
