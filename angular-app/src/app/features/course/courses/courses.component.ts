import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses!: Course[];
  isEditable: boolean = false;
  noCourses: boolean = false;
  selectedCourse!: Course; // for showing, editing, deleting

  isModalWindowShowed: boolean = false;

  destroy$ = new Subject(); // for unsubscribing

  noSearchedCourses!: boolean;

  constructor(
    
    private authService: AuthService,
    public coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private userStoreService: UserStoreService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userStoreService.isAdmin$
    .pipe(takeUntil(this.destroy$))
    .subscribe(adminState=>{
      if(adminState){      
        this.isEditable = true;
      }else{
        this.isEditable = false;
      }
    });

   this.showCourses();
  }

  showCourses(){
    this.coursesStoreService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.courses = data; // replace data arg with [] to see info msg

      if(this.courses.length == 0){
        this.noCourses = true;
      }else{
        this.courses = this.authorsStoreService.replaceWithAuthorName(this.courses) as Course[];
        this.noCourses = false;
      } 
    });// we got authors' ids
  }

  // for Search Component
  search(event: string){
    this.coursesStoreService.filter(event as string)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => { 
      if(data.length != 0){
        this.noSearchedCourses = false;
        this.courses = this.authorsStoreService.replaceWithAuthorName(data) as Course[];
      }else{
        this.courses = [];
        this.noSearchedCourses = true;
      }
    })
  }

  clearSearch(){
    this.noSearchedCourses = false;
    this.showCourses();
  }

  processCourseBtnClick(event: any){
    this.selectedCourse = event.course;
    let target = event.event.target;
    
    if(target.tagName  == "BUTTON"){ // show Course
      this.router.navigate([`/courses/${this.selectedCourse.id}`]);
    } 
    
    if(target.classList.contains("fa-pen") ||  // edit Course
    target.parentElement.classList.contains("fa-pen") || 
    target.querySelector(".fa-pen")){
      this.router.navigate([`/courses/edit/${this.selectedCourse.id}`]);
    }

    if(target.classList.contains("fa-trash") ||  // delete Course
    target.parentElement.classList.contains("fa-trash") || 
    target.querySelector(".fa-trash")){

      this.showModalWindow();
    }
  }

  showModalWindow(){
    this.isModalWindowShowed = true;
  }

  deleteCourse(event: boolean){
    if(event == true){
      // delete from Back
      this.coursesStoreService.deleteCourse(this.selectedCourse.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        console.log(data);
      });
      
      //delete from Front
      this.courses.map((course, index)=>{
        if(course.id == this.selectedCourse.id){
          
          this.courses.splice(index, 1);
        }
      });
    }
    // close modal window
    this.isModalWindowShowed = false; 
  }



  ngOnDestroy() :void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
