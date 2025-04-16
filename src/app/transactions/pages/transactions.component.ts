import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {TransactionsListComponent} from '../components/transactions-list/transactions-list.component';
import {TransactionsPaginationComponent} from '../components/transactions-pagination/transactions-pagination.component';
import {TransactionsFiltersComponent} from '../components/transactions-filters/transactions-filters.component';
import {Page} from "../../shared/models/page.model";

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
  private readonly store: Store = inject(Store<{ sidebar: SidebarState }>);

  ngOnInit(): void {
    this.store.dispatch(SidebarActions.changePage({page: Page.transactions}));
  }
}
