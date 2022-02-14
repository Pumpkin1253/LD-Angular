import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseShowComponent } from './course-show/course-show.component';
import { AuthorizedGuard } from 'src/app/auth/guards/authorized.guard';
import { AdminGuard } from 'src/app/user/guards/admin.guard';

const routes: Routes = [
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    component: CoursesComponent
  },
  {
    path: 'courses/add',
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    component: CourseFormComponent
  },
  {
    path: 'courses/:id',
    canLoad: [AuthorizedGuard],
    component: CourseShowComponent
  },
  {
    path: 'courses/edit/:id',
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    component: CourseFormComponent
  },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CourseRoutingModule { }