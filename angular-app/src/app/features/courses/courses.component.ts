import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses!: Course[];
  isEditable: boolean = false;
  
  infoTitle: string = "Your list is empty";
  infoText: string = "Please use 'Add new course' button to add your fist course";
  infoBtnText: string = "Add new course";

  modalTitle: string = "Modal Title";
  modalMessage: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
  modalOkBtnText: string = "OK";
  modalCancelBtnText: string = "Cancel";

  showModalBtnText: string = "Show Modal Window";
  isModalWindowShowed: boolean = false;

  constructor(public coursesService: CoursesService) { }

  showModalWindow(){
    this.isModalWindowShowed = true;
  }

  hideModal(event: boolean){
    this.isModalWindowShowed = event;
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

}
