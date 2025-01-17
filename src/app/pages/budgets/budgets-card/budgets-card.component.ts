import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgOptimizedImage, NgStyle, PercentPipe} from '@angular/common';
import {Budget, BudgetSpending, Spending, Transaction} from '../../../../utils/models';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../sidebar/state/sidebar.state';
import {map, Observable} from 'rxjs';
import {selectTransactionsData, selectTransactionsSpendings} from '../../transactions/state/transactions.state';

@Component({
  selector: 'app-budgets-card',
  imports: [
    NgOptimizedImage,
    NgStyle,
    CurrencyPipe,
    AsyncPipe,
    PercentPipe,
    DatePipe,
  ],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.scss'
})
export class BudgetsCardComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  @Input() budget!: Budget;

  transactions$: Observable<Transaction[]> = this.getLatestTransactions();
  budgetSpending$: Observable<BudgetSpending> = this.getBudgetSpending();

  getBudgetSpending(): Observable<BudgetSpending> {
    return this.store.select(selectTransactionsSpendings).pipe(
      map((spendings: Spending[]) =>
        spendings.find((spending: Spending) => spending.category === this.budget.category) ?? { amount: 0 } as Spending),
      map((spending: Spending): BudgetSpending => ({
        ...this.budget,
        spent: spending.amount,
        percent: spending.amount > 0 ? spending.amount/this.budget.maximum : 0,
        remaining: this.budget.maximum - spending.amount > 0 ? this.budget.maximum - spending.amount : 0
      }))
    );
  }

  getLatestTransactions(): Observable<Transaction[]> {
    return this.store.select(selectTransactionsData).pipe(
      map((transactions: Transaction[]): Transaction[] => transactions.filter((transaction: Transaction) => transaction.category === this.budget.category)),
      map((transactions: Transaction[]): Transaction[] => transactions.slice(0, 3))
    );
  }
}
