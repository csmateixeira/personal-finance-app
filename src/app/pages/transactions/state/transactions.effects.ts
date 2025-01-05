import {inject, Injectable} from '@angular/core';
import {TransactionsService} from '../../../../services/transactions.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TransactionsActions} from './transactions.actions';
import {catchError, EMPTY, exhaustMap, map} from 'rxjs';
import {Transaction} from '../../../../utils/models';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
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
}
