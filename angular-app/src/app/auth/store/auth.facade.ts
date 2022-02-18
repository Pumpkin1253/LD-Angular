import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { mergeMap, map, catchError, of, Observable, switchMap } from "rxjs";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/user/services/user.service";
import { AuthService } from "../services/auth.service";

import {
    requestLogin,
    requestLoginSuccess,
    requestLoginFail,
    requestRegister,
    requestRegisterSuccess,
    requestRegisterFail,
    requestLogout,
    requestLogoutSuccess,
    authActions,
    requestUpdateIsAuthorizedFail,
    requestUpdateIsAuthorizedSuccess,
    requestUpdateIsAuthorized
} from "./auth.actions";
import { getToken, isUserAuthorized, getSpecificErrorMessage } from "./auth.selector";



@Injectable()
export class AuthStateFacade {

    public getToken$: Observable<string> = this.store$.pipe(select(getToken));
    public isAuthorized$: Observable<boolean> = this.store$.pipe(select(isUserAuthorized));
    public getErrorMessage$: Observable<string> = this.store$.pipe(select(getSpecificErrorMessage));


    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.requestLogin),
            mergeMap(user => this.authService.login(user)
                .pipe(
                    map(data => {
                        return requestLoginSuccess({ isAuthorized: true, token: data, errorMessage: "" })
                    }),
                    catchError(() => of(requestLoginFail({ errorMessage: "No such user" })))
                )
            )
        )
    );

    registration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.requestRegister),
            mergeMap(user => this.authService.register(user)
                .pipe(
                    map(data => {
                        return requestRegisterSuccess({ isAuthorized: false, token: "", errorMessage: "" })
                    }),
                    catchError(() => of(requestRegisterFail({ errorMessage: "User is already existed" })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.requestLogout),
            mergeMap(() => this.authService.logout()
                .pipe(
                    map(data => {
                        return requestLogoutSuccess({ isAuthorized: false, token: "", errorMessage: "" })
                    }),
                    catchError(() => of(requestLoginFail({ errorMessage: "Error during logout" })))
                )
            )
        )
    );

    updateIsAuthorized$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.requestUpdateIsAuthorized),
            mergeMap(() => this.userService.getUser()
                .pipe(
                    map(data => {
                        return requestUpdateIsAuthorizedSuccess({ isAuthorized: true })
                    }),
                    catchError(() => of(requestUpdateIsAuthorizedFail({ isAuthorized: false })))
                )
            )
        )
    );

    constructor(
        private store$: Store,
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService
    ) { }

    login(user: User) {
        this.store$.dispatch(requestLogin(user));
    }

    logout() {
        this.store$.dispatch(requestLogout());
    }

    register(user: User) {
        this.store$.dispatch(requestRegister(user));
    }

    updateIsAuthorized() {
        this.store$.dispatch(requestUpdateIsAuthorized());
    }
}
