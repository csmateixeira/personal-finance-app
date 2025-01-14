import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgOptimizedImage} from '@angular/common';
import {FormatAmountPipe} from '../../../../pipes/format-amount.pipe';
import {PaginatePipe} from '../../../../pipes/page.pipe';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../sidebar/state/sidebar.state';
import {Observable} from 'rxjs';
import {Transaction} from '../../../../utils/models';
import {selectTransactionsFilteredData, selectTransactionsPage} from '../state/transactions.state';

@Component({
  selector: 'app-transactions-list',
  imports: [
    AsyncPipe,
    DatePipe,
    FormatAmountPipe,
    NgOptimizedImage,
    PaginatePipe,
    NgClass
  ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  transactions$: Observable<Transaction[]> = this.store.select(selectTransactionsFilteredData);
  page$: Observable<number> = this.store.select(selectTransactionsPage);

  headers: string[] = ['Recipient/Sender', 'Category', 'Transaction Date', 'Amount'];
}
