import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { mergeMap, map, catchError, of, Observable, switchMap } from "rxjs";

import { UserService } from "../services/user.service";
import { requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess, userActionsType, } from "./user.actions";
import { selectorGetName, selectorIsAdmin } from "./user.selector";


@Injectable()
export class UserStateFacade {

    public name$: Observable<string> = this.store$.pipe(select(selectorGetName));
    public isAdmin$: Observable<boolean> = this.store$.pipe(select(selectorIsAdmin));


    getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActionsType.requestUser),
            mergeMap(() => this.userService.getUser()
                .pipe(
                    map(data => {
                        let user = data.result;

                        return requestCurrentUserSuccess({ name: user.name, isAdmin: user.role == "admin" })
                    }),
                    catchError(() => of(requestCurrentUserFail({ name: "", isAdmin: false })))
                )
            )
        )
    );

    constructor(
        private store$: Store,
        private actions$: Actions,
        private userService: UserService
    ) { }

    getCurrentUser() {
        this.store$.dispatch(requestCurrentUser());
    }
}
