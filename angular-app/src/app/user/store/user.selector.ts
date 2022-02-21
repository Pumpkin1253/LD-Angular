import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";


export const selectorUserFeature = createFeatureSelector<UserState>("user");

export const selectorGetName = createSelector(
    selectorUserFeature,
    (state: UserState): string => state.name
);

export const selectorIsAdmin = createSelector(
    selectorUserFeature,
    (state: UserState): boolean => state.isAdmin
);