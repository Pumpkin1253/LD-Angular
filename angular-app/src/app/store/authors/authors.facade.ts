import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { mergeMap, map, catchError, of, Observable } from "rxjs";
import { AuthorsService } from "src/app/services/authors/authors.service";
import { AuthorModel } from "src/app/shared/models/author";

import {
    authorsActions,
    requestAddAuthor,
    requestAddAuthorFail,
    requestAddAuthorSuccess,
    requestAuthors,
    requestAuthorsFail,
    requestAuthorsSuccess,
    resetAddedAuthor,
    resetAddedAuthorFail,
    resetAddedAuthorSuccess
} from "./authors.actions";
import { getAuthors, getAddedAuthors } from "./authors.selector";



@Injectable()
export class AuthorsStateFacade {

    public authors$: Observable<AuthorModel[]> = this.store$.pipe(select(getAuthors));
    public addedAuthor$: Observable<AuthorModel> = this.store$.pipe(select(getAddedAuthors));


    getAuthors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authorsActions.requestAuthors,
                authorsActions.requestAddAuthorSuccess,
                authorsActions.resetAddedAuthorSuccess),
            mergeMap(() => this.authorsService.getAll()
                .pipe(
                    map(data => {
                        return requestAuthorsSuccess({ authors: data })
                    }),
                    catchError(() => of(requestAuthorsFail()))
                )
            )
        )
    );

    addAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authorsActions.requestAddAuthor),
            mergeMap(author => this.authorsService.addAuthor(author)
                .pipe(
                    map(data => {
                        return requestAddAuthorSuccess({ addedAuthor: data })
                    }),
                    catchError(() => of(requestAddAuthorFail()))
                )
            )
        )
    );

    deleteAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authorsActions.resetAddedAuthor),
            mergeMap(({ id }) => this.authorsService.deleteAuthor(id)
                .pipe(
                    map(data => {
                        return resetAddedAuthorSuccess()
                    }),
                    catchError(() => of(resetAddedAuthorFail()))
                )
            )
        )
    );

    constructor(
        private store$: Store,
        private actions$: Actions,
        private authorsService: AuthorsService
    ) { }

    getAuthors() {
        this.store$.dispatch(requestAuthors());
    }

    addAuthor(author: AuthorModel) {
        this.store$.dispatch(requestAddAuthor(author));
    }

    deleteAuthor(id: string) {
        this.store$.dispatch(resetAddedAuthor(id));
    }
}
