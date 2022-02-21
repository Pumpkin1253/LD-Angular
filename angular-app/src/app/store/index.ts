import { ActionReducerMap } from "@ngrx/store";
import { AuthStateFacade } from "../auth/store/auth.facade";
import { authReducer, AuthState } from "../auth/store/auth.reducer";
import { UserStateFacade } from "../user/store/user.facade";
import { userReducer, UserState } from "../user/store/user.reducer";
import { AuthorsStateFacade } from "./authors/authors.facade";
import { authorsReducer, AuthorsState } from "./authors/authors.reducer";
import { CourseStateFacade } from "./courses/courses.facade";
import { courseReducer, CoursesState } from "./courses/courses.reducer";

interface State {
    user: UserState,
    auth: AuthState
    authors: AuthorsState,
    courses: CoursesState
}

export const reducers: ActionReducerMap<State> = {
    user: userReducer,
    auth: authReducer,
    authors: authorsReducer,
    courses: courseReducer
};

export const effects = [UserStateFacade, AuthStateFacade, AuthorsStateFacade, CourseStateFacade]