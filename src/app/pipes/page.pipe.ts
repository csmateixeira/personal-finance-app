import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from '../../utils/models';
import {Utils} from '../../utils/utils';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: Transaction[] | null, page: number | null): Transaction[] {
    return value ? Utils.getPageData(value, page ?? 1) : [];
  }

}
