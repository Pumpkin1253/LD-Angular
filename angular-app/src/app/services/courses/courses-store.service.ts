import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  constructor(private coursesService: CoursesService) { }

  getAll(){
    return this.coursesService.getAll();
  }

  addCourse(course: Course){
    return this.coursesService.addCourse(course);
  }

  deleteCourse(id: string){
    return this.coursesService.deleteCourse(id);
  }

  getCourse(id: string){
    return this.coursesService.getCourse(id);
  }

  editCourse(course: Course){
    return this.coursesService.editCourse(course);
  }

  filter(data: string){
    return this.coursesService.filter(data);
  }
}
