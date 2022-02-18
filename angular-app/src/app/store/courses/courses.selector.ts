import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Course } from "src/app/shared/models/course";
import { CoursesState } from "./courses.reducer";


export const selectorCoursesFeature = createFeatureSelector<CoursesState>("courses");

export const isAllCoursesLoadingSelector = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): boolean => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): boolean => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): boolean => state.isSingleCourseLoading
);

export const isCourseProcessedSelector = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): boolean => state.isCourseProcessed
);

export const getCourses = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): Course[] => state.courses
);

export const getAllCourses = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): Course[] => state.allCourses
);

export const getCourse = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): Course => state.course
);

export const getErrorMessage = createSelector(
    selectorCoursesFeature,
    (state: CoursesState): string => state.errorMessage
);