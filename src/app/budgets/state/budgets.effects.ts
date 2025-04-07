import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetsService} from '../services/budgets.service';
import {BudgetsActions} from './budgets.actions';
import {catchError, EMPTY, exhaustMap, map, withLatestFrom} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {TransactionsActions} from '../../transactions/state/transactions.actions';
import {Store} from '@ngrx/store';
import {selectBudgetsData} from './budgets.state';
import {TransactionsUtils} from '../../transactions/transactions.utils';
import {selectTransactionsData} from '../../transactions/state/transactions.state';
import {Utils} from '../../shared/utils/utils';
import {Budget} from '../models/budget.model';
import {Transaction} from '../../transactions/models/transaction.model';
import {Spending} from '../models/spending.model';

@Injectable()
export class BudgetsEffects {
  private actions$: Actions<any> = inject(Actions);
  private budgetsService: BudgetsService = inject(BudgetsService);
  private store: Store<any> = inject(Store);

  loadBudgets$ = createEffect(() => this.actions$.pipe(
    ofType(BudgetsActions.loadBudgets),
    exhaustMap(() => this.budgetsService.getAllBudgets()
      .pipe(
        map(budgets => ({
          type: BudgetsActions.budgetsLoaded.type,
          budgets: budgets.map((b: Budget) => ({
            id: b.id ?? uuidv4(),
            ...b
          }))
        })),
        catchError(() => EMPTY)
      )
    )
  ));

  updateBudgetSpendings$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActions.transactionsLoaded, BudgetsActions.addBudget),
    withLatestFrom(
      this.store.select(selectBudgetsData),
      this.store.select(selectTransactionsData)
    ),
    exhaustMap(([_, budgets, transactions]: [any, Budget[], Transaction[]]) => {
      const categories: string[] = budgets.map((budget: Budget) => budget.category);
      const spendings: Spending[] = TransactionsUtils.getSpendingsForMonth(transactions, categories, 7);

      return [{
        type: BudgetsActions.budgetSpendingsUpdated.type,
        budgets: budgets.map((budget: Budget) => {
          const spending: Spending = spendings.find((s: Spending) => s.category === budget.category) ?? {
            category: budget.category,
            amount: 0
          };
          const remain: number = budget.maximum - spending.amount;

          return {
            ...budget,
            spent: spending.amount,
            percent: spending.amount > 0 ? Utils.roundNumber(spending.amount / budget.maximum) : 0,
            remaining: remain > 0 ? Utils.roundNumber(remain) : 0
          };
        })
      }]
    })
  ));
}
