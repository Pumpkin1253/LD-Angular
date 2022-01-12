import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() okButtonText!: string;
  @Input() cancelButtonText!: string;

  @Output() hideModalEvent = new EventEmitter<boolean>();

  faTimesCircle = faTimesCircle;
  constructor() { }

  hideModalWindow(){
    this.hideModalEvent.emit(false);
  }

  ngOnInit(): void {
  }

}
