import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { Course } from 'src/app/shared/models/course';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {

  course!: Course;

  isEditable: boolean = false;
  isCourseExists: boolean = false;

  courseById: Course[] = [];
  destroy$ = new Subject();

  constructor(
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(param => {
      let id: string = param.get('id') as string;

      this.coursesStoreService.getCourse(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.course = this.authorsStoreService.replaceWithAuthorName(data) as Course;
          this.isCourseExists = true;
        },
        error: ()=>{
          this.isCourseExists = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
