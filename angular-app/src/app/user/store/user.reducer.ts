import { createReducer, on } from "@ngrx/store";
import { requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess, userActionsType } from "./user.actions";

export interface UserState {
    isAdmin: boolean;
    name: string;
}

const initialState: UserState = {
    isAdmin: false,
    name: ""
}


export const userReducer = createReducer(
    initialState,
    on(requestCurrentUser, state => ({ ...state })),
    on(requestCurrentUserSuccess, (state, { name, isAdmin }) => ({ ...state, name, isAdmin })),
    on(requestCurrentUserFail, (state, { name, isAdmin }) => ({ ...state, name, isAdmin }))
);
