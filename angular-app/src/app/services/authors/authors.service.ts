import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthorModel } from '../../shared/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>("http://localhost:3000/authors/all")
      .pipe(map(data => data.result));
  }

  addAuthor(author: AuthorModel) {
    return this.http.post<any>("http://localhost:3000/authors/add", author)
      .pipe(map(data => data.result));
    //.pipe(catchError(this.handleError));
  }

  deleteAuthor(id: string) {
    return this.http.delete<any>(`http://localhost:3000/authors/${id}`)
  }

  handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return throwError(() => new Error('Error occured'));
  }
}
