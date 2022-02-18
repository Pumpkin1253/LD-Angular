import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SessionStorageService } from 'src/app/auth/services/session-storage.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorModel } from 'src/app/shared/models/author';
import { Course } from 'src/app/shared/models/course';
import { onlyLatinSymbAndNums } from 'src/app/shared/validators/author.validator';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  authors: AuthorModel[] = [];
  authorsForm: FormArray = new FormArray([]); //new FormControl('SF')
  courseForm!: FormGroup;

  titleField: string = ""; 
  descriptionField: string = "";
  durationField: string = "";
  newAuthorField: string = "";
  isSubmitBtnPressed: boolean = false; //to avoid errs 'required' as component loads

  editCourse!: Course;
  isEditMode: boolean = false;
  isCourseExists: boolean = true;
  submitBtnText: string = "Create course";

  destroy$ = new Subject();

  constructor(
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router 
  ){}

  ngOnInit(): void {
    this.checkIsEditMode();

    if(!this.isEditMode){
      this.setForm();
    }
  }

  onSubmit(value: any): void{
    let authorsIdArray: string[] = [];
    let thereAreAuthors: boolean = false;

    this.titleField = value.title;
    this.descriptionField = value.description;
    this.durationField = value.duration;
    this.newAuthorField = value.newAuthor;

    this.isSubmitBtnPressed = true;

    if(this.authorsForm.value.length != 0){
      thereAreAuthors = true;
      this.authors.forEach(author => {
        authorsIdArray.push(author.id);
      });
    }

    if(this.courseForm.valid && !this.isEditMode){ // create Course
      if(thereAreAuthors){
        this.createCourse(authorsIdArray);
      }else{ // if none authors were created
        this.createCourse([]);
      }
    }else if(this.courseForm.valid && this.isEditMode){ // edit Course
      if(thereAreAuthors){
        this.updateCourse(authorsIdArray);

        this.coursesStoreService.editCourse(this.editCourse)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => { 
          console.log(data);
          this.router.navigate(["/courses"]);
        });
        
      }else{ // if none authors were created
        this.updateCourse([]);
        this.coursesStoreService.editCourse(this.editCourse)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => { 
          console.log(data);
          this.router.navigate(["/courses"]);
        });
      }
    }
  }

  setForm(){
    this.courseForm = new FormGroup({
      "title": new FormControl(this.titleField, [Validators.required]),
      "description": new FormControl(this.descriptionField, [Validators.required]),
      "duration": new FormControl(this.durationField, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
      "newAuthor": new FormControl("", onlyLatinSymbAndNums()),
      "authors": this.authorsForm
    });

    this.courseForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.titleField = value.title;
      this.descriptionField = value.description;
      this.durationField = value.duration;
      this.newAuthorField = value.newAuthor;
    });
  }

  addAuthor(): void{
    // add author in Frontend
    this.authorsForm.push(new FormControl(this.newAuthorField));

    // send author data to Backend
    this.authorsStoreService.addAuthor({name: this.newAuthorField, id: ""})
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      console.log(data);
       
      this.authors.push(data); // author name and id from Back
    });
  }

  deleteAuthor(id: number){
    this.authors.forEach((author, index) => {
      if(index == id){
        // delete author data from Backend
        this.authorsStoreService.deleteAuthor(author.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data=>{
          console.log(data);
        });
        //delete from Frontend
        this.authorsForm.removeAt(id);
        this.authors.splice(id, 1);
      }
    });
  }

  createCourse(authorsIdArray: string[]){
    let newCourse: Course = {
      title: this.titleField,
      description: this.descriptionField,
      creationDate: new Date().toDateString(),
      duration: parseInt(this.durationField),
      authors: authorsIdArray,
      id: ""
    }
    
    this.coursesStoreService.addCourse(newCourse)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.router.navigate(["/courses"]);
    });
  }

  updateCourse(authorsIdArray: string[]){
    this.editCourse.title = this.titleField;
    this.editCourse.description = this.descriptionField;
    this.editCourse.duration = parseInt(this.durationField);
    this.editCourse.authors = authorsIdArray;
  }

  checkIsEditMode(){
    let url = this.router.url; // get current url
    console.log(url);
    
    if(/edit/.test(url)){ // check if there is 'edit' part
      this.isEditMode = true;
      this.submitBtnText = "Edit Course";

      this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        let id: string = param.get('id') as string;
  
        this.coursesStoreService.getCourse(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: data => {
            this.editCourse = data;
            this.isCourseExists = true;

            this.titleField = data.title;
            this.descriptionField = data.description;
            this.durationField = data.duration;
            
            this.authorsStoreService.getAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(authorsFromBack => { // authors mas with names and ids
              data.authors.forEach((author: string) => { // author id
                authorsFromBack.forEach((authorFromBack: AuthorModel) => { // author name and id
                  if(author == authorFromBack.id){
                    this.authorsForm.push(new FormControl(authorFromBack.name));
                    this.authors.push(authorFromBack);
                  }
                });
              
              });
            });
            this.setForm(); // set course data to inputs
          },
          error: ()=>{
            this.isCourseExists = false;
          }
        });
      });
    }
  }

  isDurationValid(): boolean{
    return (!this.durationField && this.isSubmitBtnPressed) || (!this.durationField && this.courseForm.get('duration')?.touched)
    || this.courseForm.get('duration')?.hasError('min') || this.courseForm.get('duration')?.hasError('pattern')!;
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
