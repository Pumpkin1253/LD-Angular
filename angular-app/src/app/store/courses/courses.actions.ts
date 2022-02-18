import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/shared/models/course";

export enum coursesActions {
    requestAllCourses = "[COURSES] request courses",
    requestAllCoursesSuccess = "[COURSES] courses request successful",
    requestAllCoursesFail = "[COURSES] courses request failed",

    requestSingleCourse = "[COURSES] request a course",
    requestSingleCourseSuccess = "[COURSES] course request successful",
    requestSingleCourseFail = "[COURSES] course request failed",

    requestFilteredCourses = "[COURSES] request filtred courses",
    requestFilteredCoursesSuccess = "[COURSES] filtred courses request successful",
    requestFilteredCoursesFail = "[COURSES] filtred courses request failed",

    requestDeleteCourse = "[COURSES] request deleting course",
    requestDeleteCourseSuccess = "[COURSES] deleting courses request successful",
    requestDeleteCourseFail = "[COURSES] deleting course request failed",

    requestEditCourse = "[COURSES] request editing course",
    requestEditCourseSuccess = "[COURSES] editing course request successful",
    requestEditCourseFail = "[COURSES] editing course request failed",

    requestCreateCourse = "[COURSES] request creating course",
    requestCreateCourseSuccess = "[COURSES] creating course request successful",
    requestCreateCourseFail = "[COURSES] creating course request failed",
}

export const requestAllCourses = createAction(coursesActions.requestAllCourses);
export const requestAllCoursesSuccess = createAction(coursesActions.requestAllCoursesSuccess,
    props<{ allCourses: Course[], isAllCoursesLoading: boolean, isSearchState: boolean }>()
);
export const requestAllCoursesFail = createAction(coursesActions.requestAllCoursesFail);


export const requestFilteredCourses = createAction(coursesActions.requestFilteredCourses, searchValue => {
    return { searchValue }
});
export const requestFilteredCoursesSuccess = createAction(coursesActions.requestFilteredCoursesSuccess,
    props<{ courses: Course[], isSearchState: boolean }>()
);
export const requestFilteredCoursesFail = createAction(coursesActions.requestFilteredCoursesFail);


export const requestSingleCourse = createAction(coursesActions.requestSingleCourse, id => {
    return { id }
});
export const requestSingleCourseSuccess = createAction(coursesActions.requestSingleCourseSuccess,
    props<{ course: Course, isSingleCourseLoading: boolean }>()
);
export const requestSingleCourseFail = createAction(coursesActions.requestSingleCourseFail);


export const requestEditCourse = createAction(coursesActions.requestEditCourse, editedCourse => editedCourse);
export const requestEditCourseSuccess = createAction(coursesActions.requestEditCourseSuccess,
    props<{ isCourseProcessed: boolean }>()
);
export const requestEditCourseFail = createAction(coursesActions.requestEditCourseFail);


export const requestCreateCourse = createAction(coursesActions.requestCreateCourse, course => course);
export const requestCreateCourseSuccess = createAction(coursesActions.requestCreateCourseSuccess,
    props<{ isCourseProcessed: boolean }>()
);
export const requestCreateCourseFail = createAction(coursesActions.requestCreateCourseFail);


export const requestDeleteCourse = createAction(coursesActions.requestDeleteCourse, id => {
    return { id }
});
export const requestDeleteCourseSuccess = createAction(coursesActions.requestDeleteCourseSuccess);
export const requestDeleteCourseFail = createAction(coursesActions.requestDeleteCourseFail);



