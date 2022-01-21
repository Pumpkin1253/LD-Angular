import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() placeholderText!: string;
  @Output() searchDataEvent = new EventEmitter<string>();
  

  ngOnInit(): void {
  }


  onSubmit(value: any){
    if(value.search){
      alert("Searching")
      this.searchDataEvent.emit(value)
    }
    
  }


}
