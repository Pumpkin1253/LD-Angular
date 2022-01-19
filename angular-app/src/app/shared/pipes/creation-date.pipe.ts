import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {

  transform(date: Date): string {
    let newDate = formatDate(date, 'dd.MM.YYYY', 'en-US');

    return newDate;
  }

}
