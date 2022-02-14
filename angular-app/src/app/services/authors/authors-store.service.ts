import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map} from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course';
import { AuthorModel } from '../../shared/models/author';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  constructor(private author: AuthorsService) { }

  getAll(){
    return this.author.getAll();
  }

  addAuthor(author: AuthorModel){
    return this.author.addAuthor(author);
  }

  deleteAuthor(id: string){
    return this.author.deleteAuthor(id);
  }

  // replace authors' ids in courses (course) with their names from authors service
  replaceWithAuthorName(courses: Course[] | Course): Course[] | Course{
    if(Array.isArray(courses)){
      this.getAll().subscribe(authors=>{ // get authors names and ids
        
      courses.forEach(course => {
        
          let newAuthorMas: string[] = [];
          if(course.authors.length!= 0){

             course.authors.forEach(authorFromCourse =>{ // has only id
              let authorFound: boolean = false;

               authors.forEach((author: {name: string; id: string;}) => {
                if(author.id === authorFromCourse){ // compare ids
                  authorFound = true;
                  newAuthorMas.push(author.name);
                }
              });
              
              if(!authorFound){
                newAuthorMas.push("Unknown Author");
              }
            });
          }else{
            newAuthorMas.push("No Authors");
          }
          course.authors = newAuthorMas;
        });
      });
      return courses;

    }else{
      this.getAll().subscribe(authors=>{ // get authors names and ids
  
      let newAuthorMas: string[] = [];
      if(courses.authors.length!= 0){

        courses.authors.forEach(authorFromCourse =>{ // has only id
          let authorFound: boolean = false;

            authors.forEach((author: {name: string; id: string;}) => {
            if(author.id === authorFromCourse){ // compare ids
              authorFound = true;
              newAuthorMas.push(author.name);
            }
          });
          
          if(!authorFound){
            newAuthorMas.push("Unknown Author");
          }
        });
      }else{
        newAuthorMas.push("No Authors");
      }
      courses.authors = newAuthorMas;
      });
      return courses;
    }

  }
}
