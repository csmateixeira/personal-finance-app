import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetsService} from '../../../services/budgets.service';
import {BudgetsActions} from '../actions/budgets.actions';
import {catchError, EMPTY, exhaustMap, map} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Budget} from '../../../models/features.models';

@Injectable()
export class BudgetsEffects {
  private actions$: Actions<any> = inject(Actions);
  private budgetsService: BudgetsService = inject(BudgetsService);

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
}
