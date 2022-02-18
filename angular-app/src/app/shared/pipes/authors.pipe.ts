import { Pipe, PipeTransform } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthorsService } from 'src/app/services/authors/authors.service';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {

  private authorsState = new AuthorsStateFacade(this.store$, this.actions$, this.authorsService); 

  constructor(
    private authorsService: AuthorsService,
    private store$: Store,
    private actions$: Actions,
  ){

  }
  // pipe for making space between array elements
  transform(value: string[]): string {
    let string = "";
    let authorFound: boolean = false;

    this.authorsState.authors$.subscribe(authors=>{
      value.forEach(authorId => {
        authors.forEach(author => {
          if(author.id == authorId){
            authorFound = true;
            string += author.name + ", ";
          }
        });
        if(!authorFound){
          string += "Unknown author, "; // unknow id
        }
      })
    })

    if(!string){ // empty str
      string = "No authors"
    }else{
      string = string.trim().slice(0, -1); //delete comma
    }
    return string;
  }

}
