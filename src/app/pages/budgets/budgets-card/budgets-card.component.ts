import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgOptimizedImage, NgStyle, PercentPipe} from '@angular/common';
import {Budget, BudgetSpending, Transaction} from '../../../../utils/models';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../sidebar/state/sidebar.state';
import {Observable} from 'rxjs';
import {selectTransactionsData, selectTransactionsSpendings} from '../../transactions/state/transactions.state';
import {BudgetsService} from '../../../../services/budgets.service';

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
  private budgetsService: BudgetsService = inject(BudgetsService);

  @Input() budget!: Budget;

  transactions$: Observable<Transaction[]> = this.getLatestTransactions();
  budgetSpending$: Observable<BudgetSpending> = this.getBudgetSpending();

  getBudgetSpending(): Observable<BudgetSpending> {
    return this.budgetsService.getBudgetSpending(this.store.select(selectTransactionsSpendings), this.budget);
  }

  getLatestTransactions(): Observable<Transaction[]> {
    return this.budgetsService.getLatestTransactions(this.store.select(selectTransactionsData), this.budget.category);
  }
}
