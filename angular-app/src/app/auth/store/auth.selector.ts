import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


export const selectorAuthFeature = createFeatureSelector<AuthState>("auth");

export const getToken = createSelector(
    selectorAuthFeature,
    (state: AuthState): string => state.token
);

export const isUserAuthorized = createSelector(
    selectorAuthFeature,
    (state: AuthState): boolean => state.isAuthorized
);

export const getSpecificErrorMessage = createSelector(
    selectorAuthFeature,
    (state: AuthState): string => state.errorMessage
);