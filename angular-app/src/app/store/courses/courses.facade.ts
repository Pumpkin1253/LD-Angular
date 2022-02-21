import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { mergeMap, map, catchError, of, Observable, switchMap } from "rxjs";
import { CoursesService } from "src/app/services/courses/courses.service";
import { Course } from "src/app/shared/models/course";

import { coursesActions, requestAllCourses, requestAllCoursesFail, requestAllCoursesSuccess, requestCreateCourse, requestCreateCourseFail, requestCreateCourseSuccess, requestDeleteCourse, requestDeleteCourseFail, requestDeleteCourseSuccess, requestEditCourse, requestEditCourseFail, requestEditCourseSuccess, requestFilteredCourses, requestFilteredCoursesFail, requestFilteredCoursesSuccess, requestSingleCourse, requestSingleCourseFail, requestSingleCourseSuccess } from "./courses.actions";
import { getAllCourses, getCourse, getCourses, getErrorMessage, isAllCoursesLoadingSelector, isCourseProcessedSelector, isSearchingStateSelector, isSingleCourseLoadingSelector } from "./courses.selector";



@Injectable()
export class CourseStateFacade {

    public isAllCoursesLoading$: Observable<boolean> = this.store$.pipe(select(isAllCoursesLoadingSelector));
    public isSingleCourseLoading$: Observable<boolean> = this.store$.pipe(select(isSingleCourseLoadingSelector));
    public isSearchingState$: Observable<boolean> = this.store$.pipe(select(isSearchingStateSelector));
    public isCourseProcessed$: Observable<boolean> = this.store$.pipe(select(isCourseProcessedSelector));
    public courses$: Observable<Course[]> = this.store$.pipe(select(getCourses));
    public allCourses$: Observable<Course[]> = this.store$.pipe(select(getAllCourses));
    public course$: Observable<Course> = this.store$.pipe(select(getCourse));
    public errorMessage$: Observable<string> = this.store$.pipe(select(getErrorMessage));


    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestAllCourses,
                coursesActions.requestCreateCourseSuccess,
                coursesActions.requestEditCourseSuccess,
                coursesActions.requestDeleteCourseSuccess,
            ),
            mergeMap(() => this.coursesService.getAll()
                .pipe(
                    map(data => {
                        return requestAllCoursesSuccess({ allCourses: data, isAllCoursesLoading: true, isSearchState: false })
                    }),
                    catchError(() => of(requestAllCoursesFail()))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestFilteredCourses),
            mergeMap(({ searchValue }) => this.coursesService.filter(searchValue)
                .pipe(
                    map(data => {
                        return requestFilteredCoursesSuccess({ courses: data, isSearchState: true })
                    }),
                    catchError(() => of(requestFilteredCoursesFail()))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestSingleCourse),
            mergeMap(({ id }) => this.coursesService.getCourse(id)
                .pipe(
                    map(data => {
                        return requestSingleCourseSuccess({ course: data, isSingleCourseLoading: true })
                    }),
                    catchError(() => of(requestSingleCourseFail()))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestEditCourse),
            mergeMap((editedCourse) => this.coursesService.editCourse(editedCourse)
                .pipe(
                    map(data => {
                        return requestEditCourseSuccess({ isCourseProcessed: true })
                    }),
                    catchError(() => of(requestEditCourseFail()))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestCreateCourse),
            mergeMap((course) => this.coursesService.addCourse(course)
                .pipe(
                    map(data => {
                        return requestCreateCourseSuccess({ isCourseProcessed: true })
                    }),
                    catchError(() => of(requestCreateCourseFail()))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestDeleteCourse),
            mergeMap(({ id }) => this.coursesService.deleteCourse(id)
                .pipe(
                    map(data => {
                        return requestDeleteCourseSuccess()
                    }),
                    catchError(() => of(requestDeleteCourseFail()))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(coursesActions.requestCreateCourseSuccess,
                coursesActions.requestEditCourseSuccess,
                coursesActions.requestSingleCourseFail
            ),
            map(() => {
                this.router.navigate(["/courses"]);
            })
        ),

        { dispatch: false });

    constructor(
        private store$: Store,
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router
    ) { }

    getAllCourses() {
        this.store$.dispatch(requestAllCourses());
    }

    getFilteredCourses(searchValue: string) {
        this.store$.dispatch(requestFilteredCourses(searchValue));
    }

    getSingleCourse(id: string) {
        this.store$.dispatch(requestSingleCourse(id));
    }

    editCourse(editedCourse: Course) {
        this.store$.dispatch(requestEditCourse(editedCourse));
    }

    createCourse(course: Course) {
        this.store$.dispatch(requestCreateCourse(course));
    }

    deleteCourse(id: string) {
        this.store$.dispatch(requestDeleteCourse(id));
    }
}
