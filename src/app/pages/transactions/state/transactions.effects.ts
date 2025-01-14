import {inject, Injectable} from '@angular/core';
import {TransactionsService} from '../../../../services/transactions.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TransactionsActions} from './transactions.actions';
import {catchError, EMPTY, exhaustMap, map, switchMap, withLatestFrom} from 'rxjs';
import {Option, Sort, Transaction} from '../../../../utils/models';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';
import {selectTransactions, TransactionsState} from './transactions.state';
import {Utils} from '../../../../utils/utils';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private transactionsService = inject(TransactionsService);

  loadTransactions$ = createEffect(() => this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      exhaustMap(() => this.transactionsService.getAllTransactions()
        .pipe(
          map(transactions => ({
            type: TransactionsActions.transactionsLoaded.type,
            transactions: transactions.map((t: Transaction) => ({
              id: t.id ?? uuidv4(),
              ...t
            }))
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  sortTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActions.setSortBy),
    withLatestFrom(this.store.select(selectTransactions)),
    switchMap(([action, state]: [any, TransactionsState]) => {
      const sort: string = state.sorts
        .find((option: Option) => option.id === action.sortBy)?.value ?? Sort.latest;

      return [
        {
          type: TransactionsActions.transactionsSorted.type,
          transactions: Utils.sortTransactions([...state.filteredData], sort)
        }
      ];
    })
  ));

  filterTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActions.setCategoryFilter),
    withLatestFrom(this.store.select(selectTransactions)),
    switchMap(([action, state]: [any, TransactionsState]) => {
      const category: string = state.categories
        .find((option: Option) => option.id === action.category)?.value ?? 'All Transactions';

      return [
        {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: action.category === -1 ? [...state.data] :
            Utils.filterTransactions([...state.data], category)
        }
      ];
    })
  ));
}
