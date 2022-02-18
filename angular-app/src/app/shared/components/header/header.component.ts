import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginOrRegPage: boolean = false;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    let url = this.location.path();

    if(/login/.test(url) || /registration/.test(url)){
      this.isLoginOrRegPage = true;
    }else{
      this.isLoginOrRegPage = false;
    }
  }


}
