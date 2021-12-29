import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    let index = 0;
    let hourStr;
    let minuteStr;

    while(value>= 60){
      value-=60;
      index++;
    }

    if(index < 10){ 
      hourStr = `0${index}`;
    }else{
      hourStr = `${index}`;
    }

    if(value < 10){
      minuteStr = `0${value}`;
    }else{
      minuteStr = `${value}`;
    }

    return `${hourStr}:${minuteStr} hours`;
  }

}
