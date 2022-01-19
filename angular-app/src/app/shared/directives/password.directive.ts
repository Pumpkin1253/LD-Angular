import { Directive,  ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {
  @Input() public hide!: boolean;

  constructor(private el: ElementRef) {
  }
  
  ngOnChanges(changes: SimpleChanges){
    if(changes['hide']){
      if(this.hide){
        this.el.nativeElement.type = "password";
      }else{
        this.el.nativeElement.type = "text";
      }
    }
  }


}
