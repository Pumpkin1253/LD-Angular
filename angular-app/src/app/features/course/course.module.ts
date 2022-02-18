import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses/courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseShowComponent } from './course-show/course-show.component';


@NgModule({
  declarations: [
    CourseCardComponent,
    CourseListComponent,
    CoursesComponent,
    CourseFormComponent,
    CourseShowComponent
  ],
  imports: [
    SharedModule,
    CourseRoutingModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CourseModule { }
