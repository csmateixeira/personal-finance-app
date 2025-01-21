import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {map, Observable} from 'rxjs';
import {selectTransactionsData} from '../../../../state/transactions.state';
import {TransactionsUtils} from '../../../../../utils/transactions-utils';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../../state/sidebar.state';
import {TransactionsActions} from '../../../../state/actions/transactions.actions';
import {Router} from '@angular/router';
import {Transaction} from "../../../../../models/features.models";

@Component({
  selector: 'app-budgets-card-latest',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './budgets-card-latest.component.html',
  styleUrl: './budgets-card-latest.component.scss'
})
export class BudgetsCardLatestComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);
  private router: Router = inject(Router);

  @Input() category!: string;

  transactions$: Observable<Transaction[]> = this.getLatestTransactions();

  getLatestTransactions(): Observable<Transaction[]> {
    return this.store.select(selectTransactionsData).pipe(
      map((transactions: Transaction[]): Transaction[] => TransactionsUtils.filterTransactions(transactions, this.category)),
      map((transactions: Transaction[]): Transaction[] => transactions.slice(0, 3))
    );
  }

 seeAll() {

    this.store.dispatch(TransactionsActions.updateCategoryFilter({category: this.category}));
    this.store.dispatch(TransactionsActions.setPage({page: 1}));

    this.router.navigate(['/transactions']);
  }
}
