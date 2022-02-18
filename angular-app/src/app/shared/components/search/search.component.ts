import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() placeholderText!: string;
  @Output() searchDataEvent = new EventEmitter<string>();
  @Output() clearInputEvent = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef;
  cancelIconShowed: boolean = false;
  faTimesCircle = faTimesCircle;

  ngOnInit(): void {
  }


  onSubmit(value: any){
    if(value.search){
      this.cancelIconShowed = true;
      this.searchDataEvent.emit(value.search)
    }else{
      alert("Enter info")
    }
  }

  clearInput(){
    this.cancelIconShowed = false;
    this.searchInput.nativeElement.value = null;
    this.clearInputEvent.emit();
  } 


}
