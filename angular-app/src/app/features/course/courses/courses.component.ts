import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/user/services/user.service';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { CourseStateFacade } from 'src/app/store/courses/courses.facade';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { AuthorsService } from 'src/app/services/authors/authors.service';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';

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

  public userState = new UserStateFacade(this.store$, this.actions$, this.userService);
  public coursesState = new CourseStateFacade(this.store$, this.actions$, this.courseService, this.router);
  public authorsState = new AuthorsStateFacade(this.store$, this.actions$, this.authorsService);

  destroy$ = new Subject(); // for unsubscribing

  noSearchedCourses!: boolean;

  constructor(
    public coursesStoreService: CoursesStoreService,
    public courseService: CoursesService,
    private authorsService: AuthorsService,
    private store$: Store,
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorsState.getAuthors();
    this.coursesState.getAllCourses();
    this.userState.getCurrentUser(); // update isAdmin state
  }

  showCourses() {
    this.coursesStoreService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.courses = data; // replace data arg with [] to see info msg

        if (this.courses.length == 0) {
          this.noCourses = true;
        } else {
          this.noCourses = false;
        }
      });// we got authors' ids
  }

  // for Search Component
  search(event: string) {
    this.coursesState.getFilteredCourses(event);
  }

  clearSearch() {
    this.coursesState.getAllCourses();
  }

  processCourseBtnClick(event: any) {
    this.selectedCourse = event.course;
    let target = event.event.target;

    if (target.tagName == "BUTTON") { // show Course
      this.router.navigate([`/courses/${this.selectedCourse.id}`]);
    }

    if (target.classList.contains("fa-pen") ||  // edit Course
      target.parentElement.classList.contains("fa-pen") ||
      target.querySelector(".fa-pen")) {
      this.router.navigate([`/courses/edit/${this.selectedCourse.id}`]);
    }

    if (target.classList.contains("fa-trash") ||  // delete Course
      target.parentElement.classList.contains("fa-trash") ||
      target.querySelector(".fa-trash")) {

      this.showModalWindow();
    }
  }

  showModalWindow() {
    this.isModalWindowShowed = true;
  }

  deleteCourse(event: boolean) {
    if (event == true) {
      // delete from Back
      this.coursesState.deleteCourse(this.selectedCourse.id);
    }
    // close modal window
    this.isModalWindowShowed = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
