import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() btnText?: string;
  @Input() firstIconName?: any;
  @Input() secondIconName?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
