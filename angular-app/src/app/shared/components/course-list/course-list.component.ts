import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() courses!: Course[];
  @Input() isEditable!: boolean;
  
  btnText: string ="Show courses";
  firstIconName = faPen;
  secondIconName = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

}
