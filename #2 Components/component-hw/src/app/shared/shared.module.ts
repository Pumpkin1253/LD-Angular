import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { InfoComponent } from './components/info/info.component';
import { SearchComponent } from './components/search/search.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { DurationPipe } from './pipes/duration.pipe';
import { AuthorsPipe } from './pipes/authors.pipe';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseListComponent,
  ModalWindowComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    DurationPipe,
    AuthorsPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    COMPONENTS
  ]
})
export class SharedModule { }
