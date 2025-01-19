import {Component, inject} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../sidebar/state/sidebar.state';
import {map, Observable} from 'rxjs';
import {Transaction} from '../../../../utils/models';
import {selectTransactionsFilteredData, selectTransactionsPage} from '../../../pages/transactions/state/transactions.state';
import {TransactionsActions} from '../../../pages/transactions/state/transactions.actions';

@Component({
  selector: 'app-transactions-pagination',
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './transactions-pagination.component.html',
  styleUrl: './transactions-pagination.component.scss'
})
export class TransactionsPaginationComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  transactions$: Observable<Transaction[]> = this.store.select(selectTransactionsFilteredData);
  page$: Observable<number> = this.store.select(selectTransactionsPage);
  pages$: Observable<number[]> = this.transactions$
    .pipe(
      map((transactions: Transaction[]) => Math.ceil(transactions.length / 10)),
      map((nPages: number) => Array.from({length: nPages}, (_, i) => (i + 1)))
    );

  prevPage(page: number | null): void {
    const prevPage = page ? page - 1 : 1;
    this.setPage(prevPage > 0 ? prevPage : 1);
  }

  nextPage(page: number | null, pages?: number): void {
    const nextPage: number = page ? page + 1 : 1;
    const totalPages: number = pages ?? 1;

    this.setPage(nextPage > totalPages ? totalPages : nextPage);
  }

  setPage(page: number): void {
    this.store.dispatch(() => TransactionsActions.setPage({page}));
  }
}
