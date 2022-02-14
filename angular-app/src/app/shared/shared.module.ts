import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { InfoComponent } from './components/info/info.component';
import { SearchComponent } from './components/search/search.component';
import { DurationPipe } from './pipes/duration.pipe';
import { AuthorsPipe } from './pipes/authors.pipe';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { StringJoinerPipe } from './pipes/string-joiner.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { PasswordDirective } from './directives/password.directive';


const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalWindowComponent,
  SearchComponent,
];

@NgModule({
  declarations: [
    COMPONENTS,
    DurationPipe,
    AuthorsPipe,
    EmailValidatorDirective,
    StringJoinerPipe,
    CreationDatePipe,
    PasswordDirective,
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
    ReactiveFormsModule,
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
