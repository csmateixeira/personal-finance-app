import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {BudgetsEffects} from './budgets.effects';
import {BudgetsService} from '../../../../services/budgets.service';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {BudgetsTestsUtils} from '../../../../utils/test-utils';
import {cold, hot} from 'jasmine-marbles';
import {BudgetsActions} from './budgets.actions';

describe('BudgetsEffects', () => {
  let actions$: Observable<Action>;
  let effects: BudgetsEffects;
  let service: BudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetsEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(BudgetsEffects);
    service = TestBed.inject(BudgetsService);

    spyOn(service, 'getAllBudgets').and.returnValue(of(BudgetsTestsUtils.getBudgets()));
  });

  describe('loadBudgets$', () => {
    it('should return success action to load all budgets', () => {
      actions$ = hot('a', {
        a: BudgetsActions.loadBudgets()
      });

      const result = effects.loadBudgets$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: BudgetsActions.budgetsLoaded.type,
          budgets: BudgetsTestsUtils.getBudgets()
        }
      }));
      expect(service.getAllBudgets).toHaveBeenCalled();
    })
  });
});
