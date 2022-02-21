import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginOrRegPage: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {


    this.router.events.subscribe(e => {
      if(e instanceof NavigationStart){
        if(/login/.test(e.url) || /registration/.test(e.url)){
          this.isLoginOrRegPage = true;
        }else{
          this.isLoginOrRegPage = false;
        }
      }
    });
    
  }


}
