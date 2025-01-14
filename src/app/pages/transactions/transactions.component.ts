import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Page} from '../../../utils/models';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {TransactionsPaginationComponent} from './transactions-pagination/transactions-pagination.component';
import {TransactionsFiltersComponent} from './transactions-filters/transactions-filters.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [
    TransactionsListComponent,
    TransactionsPaginationComponent,
    TransactionsFiltersComponent
  ],
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.transactions}));
  }
}
