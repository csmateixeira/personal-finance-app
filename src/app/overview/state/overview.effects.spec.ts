import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {OverviewEffects} from './overview.effects';
import {OverviewService} from '../services/overview.service';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {OverviewTestUtils} from '../../shared/utils/test-utils';
import {cold, hot} from 'jasmine-marbles';
import {OverviewActions} from './overview.actions';

describe('OverviewEffects', () => {
  let actions$: Observable<Action>;
  let effects: OverviewEffects;
  let service: OverviewService;

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      providers: [
        OverviewEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(OverviewEffects);
    service = TestBed.inject(OverviewService);

    spyOn(service, 'getAllBalances').and.returnValue(of((OverviewTestUtils.getOverviewBalances())));
  });

  it('should return success action to load all balances', () => {
    actions$ = hot('a', {
      a: OverviewActions.loadOverviewBalances()
    });

    const result = effects.loadBalances$;

    expect(result).toBeObservable(cold('a', {
      a: {
        type: OverviewActions.overviewBalancesLoaded.type,
        balance: OverviewTestUtils.getOverviewBalances().current,
        income: OverviewTestUtils.getOverviewBalances().income,
        expenses: OverviewTestUtils.getOverviewBalances().expenses
      }
    }));
    expect(service.getAllBalances).toHaveBeenCalled();
  });
});
