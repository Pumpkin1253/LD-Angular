import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoiner'
})
export class StringJoinerPipe implements PipeTransform {

  transform(mas: string[], separator: string): string {
    let str = "";

    for (let i = 0; i < mas.length; i++) {
      str += mas[i] + separator;
    }

    return str;
  }

}
