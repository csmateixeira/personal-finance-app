import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {OverviewService} from '../../../services/overview.service';
import {OverviewActions} from '../actions/overview.actions';
import {exhaustMap, map} from 'rxjs';
import {Balance} from '../../../models/features.models';

@Injectable()
export class OverviewEffects {
  private actions$: Actions<any> = inject(Actions);
  private overviewService: OverviewService = inject(OverviewService);

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
