import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, map} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {PotsService} from '../services/pots.service';
import {PotsActions} from './pots.actions';
import {Utils} from '../../shared/utils/utils';
import {Pot} from "../models/pot.model";

@Injectable()
export class PotsEffects {
  private actions$: Actions<any> = inject(Actions);
  private potsService: PotsService = inject(PotsService);

  loadPots$ = createEffect(() => this.actions$.pipe(
    ofType(PotsActions.loadPots),
    exhaustMap(() => this.potsService.getAllPots()
      .pipe(
        map(pots => ({
          type: PotsActions.potsLoaded.type,
          pots: pots.map((p: Pot) => ({
            id: p.id ?? uuidv4(),
            ...p,
            percent: p.total > 0 ? Utils.roundNumber(p.total / p.target, 4) : 0
          }))
        })),
        catchError(() => EMPTY)
      )
    )
  ));
}
