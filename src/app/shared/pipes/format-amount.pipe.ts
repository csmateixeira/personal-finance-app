import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: number): string {
    return value < 0 ? `-$${Math.abs(value)}` : `+$${Math.abs(value)}`;
  }

}
