import { Component, Input, OnInit, Output } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Course } from 'src/app/shared/models/course';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() courses!: Course[];
  @Input() isEditable!: boolean;
  @Output() courseBtnClick = new EventEmitter();
  
  btnText: string ="Show courses";
  firstIconName = faPen;
  secondIconName = faTrash;

  constructor(
  ) { }

  processBtnClick(event: any, course: Course){
    this.courseBtnClick.emit({event, course});
  }


  ngOnInit(): void {
  }

}
