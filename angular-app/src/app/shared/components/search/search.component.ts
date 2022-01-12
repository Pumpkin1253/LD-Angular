import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() placeholderText!: string;
  @Output() searchDataEvent = new EventEmitter<string>();
  
  searchData: FormControl = new FormControl();

  constructor() { }

  searchBtnClick(){
    this.searchDataEvent.emit(this.searchData.value)
  }

  ngOnInit(): void {
  }

}
