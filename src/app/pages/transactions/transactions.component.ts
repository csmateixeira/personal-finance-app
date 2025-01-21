import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../state/sidebar.state';
import {SidebarActions} from '../../state/actions/sidebar.actions';
import {Page} from '../../../models/models';
import {TransactionsListComponent} from '../../components/transactions/transactions-list/transactions-list.component';
import {TransactionsPaginationComponent} from '../../components/transactions/transactions-pagination/transactions-pagination.component';
import {TransactionsFiltersComponent} from '../../components/transactions/transactions-filters/transactions-filters.component';

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
