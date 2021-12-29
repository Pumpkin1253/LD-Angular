import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {
  // pipe for making space between array elements
  transform(value: string[]): string {
    let string = "";
    for (let i = 0; i < value.length; i++) {

      if (i!= value.length - 1) { // if it's not the last element
        string+= value[i] + ", ";
      }else{
        string+= value[i] + " ";
      }
    }
    return string;
  }

}
