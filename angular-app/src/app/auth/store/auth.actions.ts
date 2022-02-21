import { createAction, props } from "@ngrx/store";

export enum authActions {
    requestLogin = "[AUTH] request login",
    requestLoginSuccess = "[AUTH] user login successfully",
    requestLoginFail = "[AUTH] user login failed",

    requestRegister = "[AUTH] request registration",
    requestRegisterSuccess = "[AUTH] user registrated successfully",
    requestRegisterFail = "[AUTH] user registrated failed",

    requestLogout = "[AUTH] request logout",
    requestLogoutSuccess = "[AUTH] user logout successfully",

    requestUpdateIsAuthorized = "[AUTH] request update isAuthorized",
    requestUpdateIsAuthorizedSuccess = "[AUTH] update request successfull",
    requestUpdateIsAuthorizedFail = "[AUTH] update request failed"
}

export const requestLogin = createAction(authActions.requestLogin, (user) => user);
export const requestLoginSuccess = createAction(authActions.requestLoginSuccess,
    props<{ isAuthorized: boolean, token: string, errorMessage: string }>()
);
export const requestLoginFail = createAction(authActions.requestLoginFail,
    props<{ errorMessage: string }>()
);


export const requestRegister = createAction(authActions.requestRegister, (user) => user);
export const requestRegisterSuccess = createAction(authActions.requestRegisterSuccess,
    props<{ isAuthorized: boolean, token: string, errorMessage: string }>()
);
export const requestRegisterFail = createAction(authActions.requestRegisterFail,
    props<{ errorMessage: string }>()
);


export const requestLogout = createAction(authActions.requestLogout);
export const requestLogoutSuccess = createAction(authActions.requestLogoutSuccess,
    props<{ isAuthorized: boolean, token: string, errorMessage: string }>()
);

export const requestUpdateIsAuthorized = createAction(authActions.requestUpdateIsAuthorized);
export const requestUpdateIsAuthorizedSuccess = createAction(authActions.requestUpdateIsAuthorizedSuccess,
    props<{ isAuthorized: boolean }>()
);
export const requestUpdateIsAuthorizedFail = createAction(authActions.requestUpdateIsAuthorizedFail,
    props<{ isAuthorized: boolean }>()
);



