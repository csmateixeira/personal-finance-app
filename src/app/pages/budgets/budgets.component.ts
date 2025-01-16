import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Budget, BudgetSpending, Page, Series, Spending, Transaction} from '../../../utils/models';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import {selectTransactionsData, selectTransactionsSpendings} from '../transactions/state/transactions.state';
import {combineLatest, map, Observable} from 'rxjs';
import {selectBudgetsData} from './state/budgets.state';
import {AsyncPipe, CurrencyPipe, NgStyle} from '@angular/common';
import {ChartOptionsPipe} from '../../../pipes/chart-options.pipe';

@Component({
  selector: 'app-budgets',
  imports: [
    HighchartsChartModule,
    AsyncPipe,
    ChartOptionsPipe,
    NgStyle,
    CurrencyPipe
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})
export class BudgetsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  transactions$: Observable<Transaction[]> = this.store.select(selectTransactionsData);
  spendings$: Observable<Spending[]> = this.store.select(selectTransactionsSpendings);
  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);

  budgetSpendings$: Observable<BudgetSpending[]> = this.filterSpendings();
  series$: Observable<Series> = this.buildSeries();

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.budgets}));
  }

  filterSpendings(): Observable<BudgetSpending[]> {
    return combineLatest([this.spendings$, this.budgets$]).pipe(
      map(([spendings, budgets]) => budgets.map((b: Budget) => ({
        ...b,
        spent: this.getSpendingForBudget(spendings, b)?.amount ?? 0
      })))
    );
  }

  buildSeries(): Observable<Series> {
    return combineLatest([this.spendings$, this.budgets$]).pipe(
      map(([spendings, budgets]) => {
        const data: number[] = budgets
          .map((budget: Budget) => this.getSpendingForBudget(spendings, budget)?.amount || 0);

        return {
          data,
          themes: budgets.map((b: Budget) => b.theme),
          totalSpending: data.reduce((accumulator: number, current: number) => accumulator + current, 0),
          totalBudget: budgets.reduce((accumulator: number, current: Budget) => accumulator + current.maximum, 0)
        }
      })
    );
  }

  private getSpendingForBudget(spendings: Spending[], b: Budget) {
    return spendings.find((s: Spending) => s.category === b.category);
  }
}
