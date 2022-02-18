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

  @Output() modalResult = new EventEmitter<boolean>();

  faTimesCircle = faTimesCircle;
  constructor() { }

  approveAction(){
    this.modalResult.emit(true);
  }

  closeModalWindow(){
    this.modalResult.emit(false);
  }

  ngOnInit(): void {
  }

}
