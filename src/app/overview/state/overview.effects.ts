import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OverviewService} from '../services/overview.service';
import {OverviewActions} from './overview.actions';
import {exhaustMap, map} from 'rxjs';

import {Balance} from '../models/balance.model';

@Injectable()
export class OverviewEffects {
  private readonly actions$: Actions<any> = inject(Actions);
  private readonly overviewService: OverviewService = inject(OverviewService);

  loadBalances$ = createEffect(() => this.actions$.pipe(
    ofType(OverviewActions.loadOverviewBalances),
    exhaustMap(() => this.overviewService.getAllBalances()
      .pipe(
        map((balances: Balance) => ({
          type: OverviewActions.overviewBalancesLoaded.type,
          balance: balances.current,
          income: balances.income,
          expenses: balances.expenses,
        }))
      )
    )
  ));
}
