import {Component, inject} from '@angular/core';
import Highcharts from 'highcharts';
import {AsyncPipe, CurrencyPipe, NgStyle} from '@angular/common';
import {ChartOptionsPipe} from '../../../../pipes/chart-options.pipe';
import {HighchartsChartModule} from 'highcharts-angular';
import {combineLatest, map, Observable} from 'rxjs';
import {Series} from '../../../../models/models';
import {selectTransactionsSpendings} from '../../../state/transactions.state';
import {BudgetsState, selectBudgetsData} from '../../../state/budgets.state';
import {Store} from '@ngrx/store';
import {Budget, BudgetSpending, Spending} from '../../../../models/features.models';
import {BudgetsUtils} from "../../../../utils/budgets-utils";
import {Utils} from "../../../../utils/utils";

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
          totalSpending: Utils.getTotals(data),
          totalBudget: BudgetsUtils.getMaximumTotals(budgets)
        }
      })
    );
  }

  private getSpendingForBudget(spendings: Spending[], b: Budget) {
    return spendings.find((s: Spending) => s.category === b.category);
  }
}
