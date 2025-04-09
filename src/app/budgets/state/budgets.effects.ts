import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetsService} from '../services/budgets.service';
import {BudgetsActions} from './budgets.actions';
import {catchError, EMPTY, exhaustMap, map, withLatestFrom} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';
import {selectBudgetsData, selectBudgetsThemes} from './budgets.state';
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
    ofType(BudgetsActions.updateBudgetSpendings, BudgetsActions.budgetAdded),
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

  addBudget$ = createEffect(() => this.actions$.pipe(
    ofType(BudgetsActions.addBudget),
    withLatestFrom(
      this.store.select(selectBudgetsThemes),
    ),
    exhaustMap(([{newBudget}, themes]) => {
      const themeIndex: number = themes.findIndex(theme => theme.name === newBudget.theme);

      return this.budgetsService.addBudget({
        ...newBudget,
        theme: themes[themeIndex].color,
      }).pipe(
        map((budget: Budget) => ({
          type: BudgetsActions.budgetAdded.type,
          newBudget: budget
        })),
        catchError((error) => {
          console.error('Error adding new budget', error);
          return EMPTY;
        })
      )
    })
  ));

  editBudget$ = createEffect(() => this.actions$.pipe(
    ofType(BudgetsActions.editBudget),
    withLatestFrom(
      this.store.select(selectBudgetsData),
    ),
    exhaustMap(([{newBudget}, budgets]) => {
      const budget: Budget | undefined = budgets.find((b: Budget) => b.category === newBudget.category);
      if (!budget) {
        console.error(`No matching budget found for category: ${newBudget.category}`);
        return EMPTY;
      }

      return this.budgetsService.updateBudget({
        id: budget.id,
        category: budget.category,
        maximum: newBudget.maximum,
        theme: budget.theme
      }).pipe(
        map((budget: Budget) => ({
          type: BudgetsActions.budgetEdited.type,
          newBudget: budget
        })),
        catchError((error) => {
          console.error('Error editing budget', error);
          return EMPTY;
        })
      )
    })
  ));
}
