import { createAction, props } from "@ngrx/store";

export enum userActionsType {
    requestUser = "[USER] request user",
    requestUserSuccess = "[USER] user requested successfully",
    requestUserFail = "[USER] user request failed",
}

export const requestCurrentUser = createAction(userActionsType.requestUser);
export const requestCurrentUserSuccess = createAction(userActionsType.requestUserSuccess,
    props<{ name: string, isAdmin: boolean }>()
);
export const requestCurrentUserFail = createAction(userActionsType.requestUserFail,
    props<{ name: string, isAdmin: boolean }>()
);

