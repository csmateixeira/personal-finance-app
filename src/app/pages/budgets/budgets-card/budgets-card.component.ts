import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Budget, BudgetSpending, Spending} from '../../../../utils/models';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {selectTransactionsSpendings} from '../../transactions/state/transactions.state';
import {BudgetsUtils} from "../../../../utils/budgets-utils";
import {BudgetsCardSummaryComponent} from "./budgets-card-summary/budgets-card-summary.component";
import {BudgetsCardSpendingComponent} from "./budgets-card-spending/budgets-card-spending.component";
import {BudgetsCardLatestComponent} from "./budgets-card-latest/budgets-card-latest.component";
import {BudgetsState} from '../state/budgets.state';

@Component({
    selector: 'app-budgets-card',
    imports: [
        AsyncPipe,
        BudgetsCardSummaryComponent,
        BudgetsCardSpendingComponent,
        BudgetsCardLatestComponent,
    ],
    templateUrl: './budgets-card.component.html',
    styleUrl: './budgets-card.component.scss'
})
export class BudgetsCardComponent {
    private store: Store = inject(Store<{ budgets: BudgetsState }>);

    @Input() budget!: Budget;

    budgetSpending$: Observable<BudgetSpending> = this.getBudgetSpending();

    getBudgetSpending(): Observable<BudgetSpending> {
        return this.store.select(selectTransactionsSpendings).pipe(
            map((spendings: Spending[]) => BudgetsUtils.findSpendingForCategory(spendings, this.budget.category)),
            map((spending: Spending): BudgetSpending => BudgetsUtils.getBudgetSpending(this.budget, spending))
        );
    }
}
