import { createReducer, on } from "@ngrx/store";
import { Course } from "src/app/shared/models/course";
import {
    requestAllCourses,
    requestAllCoursesSuccess,
    requestAllCoursesFail,
    requestFilteredCourses,
    requestFilteredCoursesFail,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess,
    requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestCreateCourse,
    requestCreateCourseFail,
    requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess
} from "./courses.actions";

export interface CoursesState {
    allCourses: Course[];
    courses: Course[];
    course: Course;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    isCourseProcessed: boolean; // to get know when creating&editing is completed
    errorMessage: string;
}

const initialState: CoursesState = {
    allCourses: [],
    courses: [],
    course: { title: "", description: "", duration: 0, creationDate: "", authors: [], id: "" },
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    isCourseProcessed: false,
    errorMessage: ""
}


export const courseReducer = createReducer(
    initialState,
    on(requestAllCourses, state => ({ ...state })),
    on(requestAllCoursesSuccess, (state, { allCourses, isAllCoursesLoading, isSearchState }) => ({ ...state, allCourses, isAllCoursesLoading, isSearchState })),
    on(requestAllCoursesFail, (state) => ({ ...state })),

    on(requestFilteredCourses, (state, searchValue) => ({ ...state, searchValue })),
    on(requestFilteredCoursesSuccess, (state, { courses, isSearchState }) => ({ ...state, courses, isSearchState })),
    on(requestFilteredCoursesFail, (state) => ({ ...state })),

    on(requestSingleCourse, (state, id) => ({ ...state, id })),
    on(requestSingleCourseSuccess, (state, { course, isSingleCourseLoading }) => ({ ...state, course, isSingleCourseLoading })),
    on(requestSingleCourseFail, state => ({ ...state })),

    on(requestEditCourse, (state, course) => ({ ...state, course })),
    on(requestEditCourseSuccess, (state, { isCourseProcessed }) => ({ ...state, isCourseProcessed })),
    on(requestEditCourseFail, state => ({ ...state })),

    on(requestCreateCourse, (state, course) => ({ ...state, course })),
    on(requestCreateCourseSuccess, (state, { isCourseProcessed }) => ({ ...state, isCourseProcessed })),
    on(requestCreateCourseFail, state => ({ ...state })),

    on(requestDeleteCourse, (state, id) => ({ ...state, id })),
    on(requestDeleteCourseSuccess, (state,) => ({ ...state })),
    on(requestDeleteCourseFail, state => ({ ...state })),
);

// problem to add in reducers (index.ts)
// export const courseReducer = (state:
//     CoursesState, action: Action): CoursesState => reducer(state,
//     action);



