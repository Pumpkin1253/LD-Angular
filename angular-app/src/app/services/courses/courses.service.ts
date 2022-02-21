import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { SessionStorageService } from 'src/app/auth/services/session-storage.service';
import { Course } from 'src/app/shared/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  getAll(){
    return this.http.get<any>("http://localhost:3000/courses/all")
    .pipe(map(data => data.result));
  }

  getCourse(id: string){
    return this.http.get<any>(`http://localhost:3000/courses/${id}`)
    .pipe(map(data => data.result));
  }

  addCourse(course: Course){
    return this.http.post<any>("http://localhost:3000/courses/add", course);
  }

  deleteCourse(id: string){
    return this.http.delete<any>(`http://localhost:3000/courses/${id}`);
  }

  editCourse(course: Course){
    return this.http.put<any>(`http://localhost:3000/courses/${course.id}`,course);
  }

  filter(data: string){
    let params = new HttpParams()
    .set('title', data)
    
    return this.http.get<any>("http://localhost:3000/courses/filter", {params})
    .pipe(map(data => data.result));
  }
  

  handleError(err: HttpErrorResponse){
    console.log(err.message);

    return throwError("Error occured");
  }

}
