import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgOptimizedImage, NgStyle, PercentPipe} from '@angular/common';
import {Budget, BudgetSpending, Spending, Transaction} from '../../../../utils/models';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../sidebar/state/sidebar.state';
import {map, Observable} from 'rxjs';
import {selectTransactionsData, selectTransactionsSpendings} from '../../transactions/state/transactions.state';
import {BudgetsUtils} from "../../../../utils/budgets-utils";
import {TransactionsUtils} from "../../../../utils/transactions-utils";

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

    showDropdown = false;

    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    getBudgetSpending(): Observable<BudgetSpending> {
        return this.store.select(selectTransactionsSpendings).pipe(
            map((spendings: Spending[]) => BudgetsUtils.findSpendingForCategory(spendings, this.budget.category)),
            map((spending: Spending): BudgetSpending => BudgetsUtils.getBudgetSpending(this.budget, spending))
        );
    }

    getLatestTransactions(): Observable<Transaction[]> {
        return this.store.select(selectTransactionsData).pipe(
            map((transactions: Transaction[]): Transaction[] => TransactionsUtils.filterTransactions(transactions, this.budget.category)),
            map((transactions: Transaction[]): Transaction[] => transactions.slice(0, 3))
        );
    }

    edit() {

    }

    delete() {

    }
}
