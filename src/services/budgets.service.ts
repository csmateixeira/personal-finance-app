import {Injectable} from '@angular/core';
import {Budget, BudgetSpending, Spending, Transaction} from '../utils/models';
import {map, Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  getAllBudgets(): Observable<Budget[]> {
    return of(Data.getBudgets());
  }

  getBudgetSpending(spendings$: Observable<Spending[]>, budget: Budget): Observable<BudgetSpending> {
    return spendings$.pipe(
      map((spendings: Spending[]) =>
        spendings.find((spending: Spending) => spending.category === budget.category) ?? { amount: 0 } as Spending),
      map((spending: Spending): BudgetSpending => ({
        ...budget,
        spent: spending.amount,
        percent: spending.amount > 0 ? spending.amount/budget.maximum : 0,
        remaining: budget.maximum - spending.amount > 0 ? Utils.roundNumber(budget.maximum - spending.amount) : 0
      }))
    );
  }

  getLatestTransactions(transactions$: Observable<Transaction[]>, category: string): Observable<Transaction[]> {
    return transactions$.pipe(
      map((transactions: Transaction[]): Transaction[] => transactions.filter((transaction: Transaction) => transaction.category === category)),
      map((transactions: Transaction[]): Transaction[] => transactions.slice(0, 3))
    );
  }
}
