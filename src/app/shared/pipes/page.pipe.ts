import {Pipe, PipeTransform} from '@angular/core';
import {TransactionsUtils} from '../../transactions/transactions.utils';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform<T>(value: T[] | null, page: number | null): T[] {
    return value ? TransactionsUtils.getPageData<T>(value, page ?? 1) : [];
  }

}
