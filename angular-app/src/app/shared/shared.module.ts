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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { StringJoinerPipe } from './pipes/string-joiner.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { PasswordDirective } from './directives/password.directive';


const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseListComponent,
  ModalWindowComponent,
  SearchComponent,
  CourseFormComponent,
  RegistrationComponent,
  LoginComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    DurationPipe,
    AuthorsPipe,
    EmailValidatorDirective,
    StringJoinerPipe,
    CreationDatePipe,
    PasswordDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    EmailValidatorDirective,
    DurationPipe,
    AuthorsPipe,
    StringJoinerPipe,
    CreationDatePipe,
    PasswordDirective,
    COMPONENTS
  ]
})
export class SharedModule { }
