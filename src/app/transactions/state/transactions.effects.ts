import {inject, Injectable} from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TransactionsActions} from './transactions.actions';
import {catchError, EMPTY, exhaustMap, map, switchMap, withLatestFrom} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';
import {selectTransactions, TransactionsState} from './transactions.state';
import {TransactionsUtils} from '../transactions.utils';
import {Option} from '../../shared/models/option.model';
import {Sort} from '../../shared/models/sort.model';
import {Transaction} from '../models/transaction.model';

@Injectable()
export class TransactionsEffects {
  private readonly actions$: Actions<any> = inject(Actions);
  private readonly store: Store<any> = inject(Store);
  private readonly transactionsService = inject(TransactionsService);

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
          transactions: TransactionsUtils.sortTransactions([...state.filteredData], sort)
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
            TransactionsUtils.filterTransactions([...state.data], category)
        }
      ];
    })
  ));

  filterTransactionsByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActions.updateCategoryFilter),
    withLatestFrom(this.store.select(selectTransactions)),
    switchMap(([action, state]: [any, TransactionsState]) => {
      return [
        {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TransactionsUtils.filterTransactions([...state.data], action.category)
        }
      ];
    })
  ));

  searchTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActions.search),
    withLatestFrom(this.store.select(selectTransactions)),
    switchMap(([action, state]: [any, TransactionsState]) => {
      const category: string = state.categories
        .find((option: Option) => option.id === state.categoryFilter)?.value ?? 'All Transactions';

      const searchedTransactions: Transaction[] = state.categoryFilter === -1 ?
        TransactionsUtils.searchTransactions([...state.data], action.search) :
        TransactionsUtils.searchTransactions([...state.data], action.search, category);

      return [
        {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: searchedTransactions
        }
      ];
    })
  ));
}
