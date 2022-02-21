import { createReducer, on } from "@ngrx/store";
import {
    requestLogin,
    requestLoginSuccess,
    requestLoginFail,
    requestRegister,
    requestRegisterSuccess,
    requestRegisterFail,
    requestLogout,
    requestLogoutSuccess,
    requestUpdateIsAuthorized,
    requestUpdateIsAuthorizedFail,
    requestUpdateIsAuthorizedSuccess
} from "./auth.actions";

export interface AuthState {
    isAuthorized: boolean;
    token: string;
    errorMessage: string;
}

const initialState: AuthState = {
    isAuthorized: false,
    token: "",
    errorMessage: ""
}


export const authReducer = createReducer(
    initialState,
    on(requestLogin, state => ({ ...state })),
    on(requestLoginSuccess, (state, { isAuthorized, token, errorMessage }) => ({ ...state, isAuthorized, token, errorMessage })),
    on(requestLoginFail, (state, { errorMessage }) => ({ ...state, errorMessage })),

    on(requestRegister, state => ({ ...state })),
    on(requestRegisterSuccess, (state, { isAuthorized, token, errorMessage }) => ({ ...state, isAuthorized, token, errorMessage })),
    on(requestRegisterFail, (state, { errorMessage }) => ({ ...state, errorMessage })),

    on(requestLogout, state => ({ ...state })),
    on(requestLogoutSuccess, (state, { isAuthorized, token, errorMessage }) => ({ ...state, isAuthorized, token, errorMessage })),

    on(requestUpdateIsAuthorized, state => ({ ...state })),
    on(requestUpdateIsAuthorizedSuccess, (state, { isAuthorized }) => ({ ...state, isAuthorized })),
    on(requestUpdateIsAuthorizedFail, (state, { isAuthorized }) => ({ ...state, isAuthorized })),
);

