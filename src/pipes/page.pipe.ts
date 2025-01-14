import {Pipe, PipeTransform} from '@angular/core';
import {Utils} from '../utils/utils';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform<T>(value: T[] | null, page: number | null): T[] {
    return value ? Utils.getPageData<T>(value, page ?? 1) : [];
  }

}
