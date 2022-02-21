import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { CoursesService } from 'src/app/services/courses/courses.service';
import { CourseStateFacade } from 'src/app/store/courses/courses.facade';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { AuthorsService } from 'src/app/services/authors/authors.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {

  public coursesState = new CourseStateFacade(this.store$, this.actions$, this.courseService, this.router);
  public authorsState = new AuthorsStateFacade(this.store$, this.actions$, this.authorsService);

  destroy$ = new Subject();

  constructor(
    public courseService: CoursesService,
    private authorsService: AuthorsService,
    private store$: Store,
    private actions$: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authorsState.getAuthors();
    this.activatedRoute.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(param => {
      let id: string = param.get('id') as string;

      this.coursesState.getSingleCourse(id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
