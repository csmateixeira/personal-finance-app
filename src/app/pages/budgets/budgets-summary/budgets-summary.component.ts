import {Component, inject} from '@angular/core';
import Highcharts from 'highcharts';
import {AsyncPipe, CurrencyPipe, NgStyle} from '@angular/common';
import {ChartOptionsPipe} from '../../../../pipes/chart-options.pipe';
import {HighchartsChartModule} from 'highcharts-angular';
import {combineLatest, map, Observable} from 'rxjs';
import {Budget, BudgetSpending, Series, Spending} from '../../../../utils/models';
import {selectTransactionsSpendings} from '../../transactions/state/transactions.state';
import {BudgetsState, selectBudgetsData} from '../state/budgets.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-budgets-summary',
  imports: [
    AsyncPipe,
    ChartOptionsPipe,
    CurrencyPipe,
    HighchartsChartModule,
    NgStyle
  ],
  templateUrl: './budgets-summary.component.html',
  styleUrl: './budgets-summary.component.scss'
})
export class BudgetsSummaryComponent {
  private store: Store = inject(Store<{ budgets: BudgetsState }>);

  spendings$: Observable<Spending[]> = this.store.select(selectTransactionsSpendings);
  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);
  budgetSpendings$: Observable<BudgetSpending[]> = this.filterSpendings();
  series$: Observable<Series> = this.buildSeries();

  protected readonly Highcharts = Highcharts;

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
