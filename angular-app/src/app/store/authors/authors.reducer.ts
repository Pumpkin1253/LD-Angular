import { createReducer, on } from "@ngrx/store";
import { AuthorModel } from "src/app/shared/models/author";
import {
    requestAuthors,
    requestAuthorsSuccess,
    requestAuthorsFail,
    requestAddAuthor,
    requestAddAuthorFail,
    requestAddAuthorSuccess,
    resetAddedAuthor,
    resetAddedAuthorFail,
    resetAddedAuthorSuccess,

} from "./authors.actions";

export interface AuthorsState {
    authors: AuthorModel[]; // array of id
    addedAuthor: AuthorModel; // name&id
}

const initialState: AuthorsState = {
    authors: [],
    addedAuthor: { name: "", id: "" }
}


export const authorsReducer = createReducer(
    initialState,
    on(requestAuthors, state => ({ ...state })),
    on(requestAuthorsSuccess, (state, { authors }) => ({ ...state, authors })),
    on(requestAuthorsFail, (state) => ({ ...state })),

    on(requestAddAuthor, (state, { addedAuthor }) => ({ ...state, addedAuthor })),
    on(requestAddAuthorSuccess, (state, { addedAuthor }) => ({ ...state, addedAuthor })),
    on(requestAddAuthorFail, (state) => ({ ...state })),

    on(resetAddedAuthor, (state, id) => ({ ...state, id })),
    on(resetAddedAuthorSuccess, state => ({ ...state })),
    on(resetAddedAuthorFail, state => ({ ...state })),
);

