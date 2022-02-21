import { createAction, props } from "@ngrx/store";
import { AuthorModel } from "src/app/shared/models/author";

export enum authorsActions {
    requestAuthors = "[AUTHORS] request authors",
    requestAuthorsSuccess = "[AUTHORS] authors request successful",
    requestAuthorsFail = "[AUTHORS] authors request failed",

    requestAddAuthor = "[AUTHORS] request add author",
    requestAddAuthorSuccess = "[AUTHORS] author added successfully",
    requestAddAuthorFail = "[AUTHORS] author adding failed",

    resetAddedAuthor = "[AUTHORS] request reset added author",
    resetAddedAuthorSuccess = "[AUTHORS] author deleted successfully",
    resetAddedAuthorFail = "[AUTHORS] author deleting failed",
}

export const requestAuthors = createAction(authorsActions.requestAuthors);
export const requestAuthorsSuccess = createAction(authorsActions.requestAuthorsSuccess,
    props<{ authors: AuthorModel[] }>()
);
export const requestAuthorsFail = createAction(authorsActions.requestAuthorsFail);


export const requestAddAuthor = createAction(authorsActions.requestAddAuthor, (addedAuthor) => addedAuthor);
export const requestAddAuthorSuccess = createAction(authorsActions.requestAddAuthorSuccess,
    props<{ addedAuthor: AuthorModel }>()
);
export const requestAddAuthorFail = createAction(authorsActions.requestAddAuthorFail);


export const resetAddedAuthor = createAction(authorsActions.resetAddedAuthor, id => {
    return { id }
});
export const resetAddedAuthorSuccess = createAction(authorsActions.resetAddedAuthorSuccess);
export const resetAddedAuthorFail = createAction(authorsActions.resetAddedAuthorFail);



