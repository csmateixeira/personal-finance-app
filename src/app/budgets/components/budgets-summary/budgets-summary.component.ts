import {Component, inject} from '@angular/core';
import Highcharts from 'highcharts';
import {AsyncPipe, CurrencyPipe, NgStyle} from '@angular/common';
import {ChartOptionsPipe} from '../../../shared/pipes/chart-options.pipe';
import {HighchartsChartModule} from 'highcharts-angular';
import {map, Observable} from 'rxjs';
import {BudgetsState, selectBudgetsData} from '../../state/budgets.state';
import {Store} from '@ngrx/store';
import {BudgetsUtils} from "../../budgets.utils";
import {Utils} from "../../../shared/utils/utils";
import {Budget} from '../../models/budget.model';
import {Series} from '../../../shared/models/series.model';

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

  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);
  series$: Observable<Series> = this.buildSeries();

  protected readonly Highcharts = Highcharts;

  buildSeries(): Observable<Series> {
    return this.budgets$.pipe(
      map((budgets: Budget[]) => {
        const data: number[] = budgets.map((budget: Budget) => budget.spent || 0);

        return {
          data,
          themes: budgets.map((b: Budget) => b.theme),
          totalSpending: Utils.getTotals(data),
          totalBudget: BudgetsUtils.getMaximumTotals(budgets)
        }
      })
    );
  }
}
