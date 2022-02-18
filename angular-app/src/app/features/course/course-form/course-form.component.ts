import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { AuthorsService } from 'src/app/services/authors/authors.service';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { AuthorModel } from 'src/app/shared/models/author';
import { Course } from 'src/app/shared/models/course';
import { onlyLatinSymbAndNums } from 'src/app/shared/validators/author.validator';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CourseStateFacade } from 'src/app/store/courses/courses.facade';

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

  public authorsState = new AuthorsStateFacade(this.store$, this.actions$, this.authorsService);
  public coursesState = new CourseStateFacade(this.store$, this.actions$, this.courseService, this.router);

  destroy$ = new Subject();

  constructor(
    private coursesStoreService: CoursesStoreService,
    public courseService: CoursesService,
    private authorsStoreService: AuthorsStoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store$: Store,
    private actions$: Actions,
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.checkIsEditMode();

    if (!this.isEditMode) {
      this.setForm();
    }
  }

  onSubmit(value: any): void {
    let authorsIdArray: string[] = [];
    let thereAreAuthors: boolean = false;

    this.titleField = value.title;
    this.descriptionField = value.description;
    this.durationField = value.duration;
    this.newAuthorField = value.newAuthor;

    this.isSubmitBtnPressed = true;

    if (this.authorsForm.value.length != 0) {
      thereAreAuthors = true;
      this.authors.forEach(author => {
        authorsIdArray.push(author.id);
      });
    }

    if (this.courseForm.valid && !this.isEditMode) { // create Course
      if (thereAreAuthors) {
        this.createCourse(authorsIdArray);
      } else { // if none authors were created
        this.createCourse([]);
      }
    } else if (this.courseForm.valid && this.isEditMode) { // edit Course
      if (thereAreAuthors) {
        this.updateCourse(authorsIdArray);

      } else { // if none authors were created
        this.updateCourse([]);

      }
    }
  }

  setForm() {
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

  addAuthor(): void {
    // add author in Frontend
    this.authorsForm.push(new FormControl(this.newAuthorField));

    // send author data to Backend
    this.authorsState.addAuthor({ name: this.newAuthorField, id: "" });

    this.authorsState.addedAuthor$.subscribe((data: AuthorModel) => {
      if (data) {
        this.authors.push(data); // author name and id from Back
      }
    });
  }

  deleteAuthor(id: number) {
    this.authors.forEach((author, index) => {
      if (index == id) {
        // delete author data from Backend
        this.authorsState.deleteAuthor(author.id);

        //delete from Frontend
        this.authorsForm.removeAt(id);
        this.authors.splice(id, 1);
      }
    });
  }

  createCourse(authorsIdArray: string[]) {
    let newCourse: Course = {
      title: this.titleField,
      description: this.descriptionField,
      creationDate: new Date().toDateString(),
      duration: parseInt(this.durationField),
      authors: authorsIdArray,
      id: ""
    }

    this.coursesState.createCourse(newCourse);
  }

  updateCourse(authorsIdArray: string[]) {
    this.editCourse.title = this.titleField;
    this.editCourse.description = this.descriptionField;
    this.editCourse.duration = parseInt(this.durationField);
    this.editCourse.authors = authorsIdArray;

    this.coursesState.editCourse(this.editCourse);
  }

  checkIsEditMode() {
    let url = this.router.url; // get current url

    if (/edit/.test(url)) { // check if there is 'edit' part
      this.isEditMode = true;
      this.submitBtnText = "Edit Course";

      this.activatedRoute.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(param => {
          let id: string = param.get('id') as string;

          this.coursesStoreService.getCourse(id)
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
                        if (author == authorFromBack.id) {
                          this.authorsForm.push(new FormControl(authorFromBack.name));
                          this.authors.push(authorFromBack);
                        }
                      });

                    });
                  });
                this.setForm(); // set course data to inputs
              },
              error: () => {
                this.isCourseExists = false;
              }
            });
        });
    }
  }

  isDurationValid(): boolean {
    return (!this.durationField && this.isSubmitBtnPressed) || (!this.durationField && this.courseForm.get('duration')?.touched)
      || this.courseForm.get('duration')?.hasError('min') || this.courseForm.get('duration')?.hasError('pattern')!;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
