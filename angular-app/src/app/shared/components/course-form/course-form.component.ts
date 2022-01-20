import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { onlyLatinSymbAndNums } from '../../validators/author.validator';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  titleField!: string; 
  descriptionField!: string;
  durationField!: string;
  newAuthorField!: string;
  isSubmitBtnPressed: boolean = false; //to avoid errs 'required' as component loads

  authors: FormArray = new FormArray([]); //new FormControl('SF')

  courseForm!: FormGroup;
  formSubscr!: Subscription;

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      "title": new FormControl("", [Validators.required]),
      "description": new FormControl("", [Validators.required]),
      "duration": new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
      "newAuthor": new FormControl("", onlyLatinSymbAndNums()),
      "authors": this.authors
    });

    this.formSubscr = this.courseForm.valueChanges.subscribe(value => {
      this.titleField = value.title;
      this.descriptionField = value.description;
      this.durationField = value.duration;
      this.newAuthorField = value.newAuthor;
    }); 
  }

  onSubmit(value: any): void{
    this.titleField = value.title;
    this.descriptionField = value.description;
    this.durationField = value.duration;
    this.newAuthorField = value.newAuthor;

    this.isSubmitBtnPressed = true;

    if(this.courseForm.valid){
      alert("Course created")
    }
  }

  addAuthor(): void{
    this.authors.push(new FormControl(this.newAuthorField));
  }

  isDurationValid(): boolean{
    return (!this.durationField && this.isSubmitBtnPressed) || (!this.durationField && this.courseForm.get('duration')?.touched)
    || this.courseForm.get('duration')?.hasError('min') || this.courseForm.get('duration')?.hasError('pattern')!;
  }

  ngOnDestroy(): void{
    this.formSubscr.unsubscribe();
  }
}
