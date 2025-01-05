import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';
import {TransactionsActions} from './transactions.actions';
import {TransactionsEffects} from './transactions.effects';
import {TestUtils} from '../../../../utils/test-utils';
import {TransactionsService} from '../../../../services/transactions.service';

describe('TransactionsEffects', () => {
  let actions$: Observable<Action>;
  let effects: TransactionsEffects;
  let service: TransactionsService;

  beforeEach(() => {
    actions$ = new Observable<Action>()

    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.inject(TransactionsEffects);
    service = TestBed.inject(TransactionsService);
  });

  it('should return success action to load all transactions', () => {
    spyOn(service, 'getAllTransactions').and.returnValue(of(TestUtils.getTransactions()));

    actions$ = hot('a', {
      a: TransactionsActions.loadTransactions()
    });

    const result = effects.loadTransactions$;

    expect(result).toBeObservable(cold('a', {
      a: {
        type: TransactionsActions.transactionsLoaded.type,
        transactions: TestUtils.getTransactions()
      }
    }));
    expect(service.getAllTransactions).toHaveBeenCalled();
  })
});
