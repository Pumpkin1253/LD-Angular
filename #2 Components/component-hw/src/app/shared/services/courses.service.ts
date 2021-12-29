import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }
  // to see info component delete all course objects inside array below, make it empty 
  courses: Course[]  =[
    {
      title: "Angular",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      creationDate: new Date(),
      duration: 15,
      authors: ["Nickita Matvieiev"]
    },
    {
      title: "JS",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      creationDate: new Date(),
      duration: 125,
      authors: ["John Doe", "Ivan Ivanov"]
    },
    {
      title: "HTML",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      creationDate: new Date(),
      duration: 220,
      authors: ["John Doe"]
    },
    {
      title: "PHP",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      creationDate: new Date(),
      duration: 100,
      authors: ["Danil Browin"]
    },
    {
      title: "Java",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      creationDate: new Date(),
      duration: 60,
      authors: ["Yurii Doe", "Vlad Petrov"]
    },
    {
      title: "Python",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      creationDate: new Date(),
      duration: 120,
      authors: ["Ivan Ivanov"]
    }
  ];


  getCourses(){
    return this.courses;
  }
}
