import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorModel } from "src/app/shared/models/author";
import { AuthorsState } from "./authors.reducer";


export const selectorAuthorsFeature = createFeatureSelector<AuthorsState>("authors");

export const getAuthors = createSelector(
    selectorAuthorsFeature,
    (state: AuthorsState): AuthorModel[] => state.authors
);

export const getAddedAuthors = createSelector(
    selectorAuthorsFeature,
    (state: AuthorsState): AuthorModel => state.addedAuthor
);
