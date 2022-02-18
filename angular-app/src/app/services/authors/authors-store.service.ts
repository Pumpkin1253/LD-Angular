import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { AuthorModel } from '../../shared/models/author';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  public authorsState = new AuthorsStateFacade(this.store$, this.actions$, this.authorsService);

  constructor(
    private authorsService: AuthorsService,
    private store$: Store,
    private actions$: Actions
  ) {
  }

  getAll() {
    return this.authorsService.getAll();
  }

  addAuthor(author: AuthorModel) {
    return this.authorsService.addAuthor(author);
  }

  deleteAuthor(id: string) {
    return this.authorsService.deleteAuthor(id);
  }

}
