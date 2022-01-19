import { Component } from '@angular/core';

import { CreationDatePipe } from './shared/pipes/creation-date.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'component-hw';
  date = new Date();

  array: string[] = ["Hello", "nice", "to", "see", "you"];
  separator: string = "!";
}
