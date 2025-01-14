import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';
import {TransactionsActions} from './transactions.actions';
import {TransactionsEffects} from './transactions.effects';
import {TestUtils} from '../../../../utils/test-utils';
import {TransactionsService} from '../../../../services/transactions.service';
import {Utils} from '../../../../utils/utils';
import {createMockStore, MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectTransactions, TransactionsState} from './transactions.state';
import {Sort} from '../../../../utils/models';

describe('TransactionsEffects', () => {
  let actions$: Observable<Action>;
  let effects: TransactionsEffects;
  let service: TransactionsService;
  let store: MockStore<TransactionsState>;

  beforeEach(() => {
    actions$ = new Observable<Action>()

    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(TransactionsEffects);
    service = TestBed.inject(TransactionsService);

    spyOn(service, 'getAllTransactions').and.returnValue(of(TestUtils.getTransactions()));
    spyOn(Utils, 'sortTransactions').and.returnValue(TestUtils.getTransactionsSorted());
    spyOn(Utils, 'filterTransactions').and.returnValue(TestUtils.getTransactionsSorted());
    spyOn(Utils, 'searchTransactions').and.returnValue(TestUtils.getTransactionsSorted());
  });

  describe('loadTransactions$', () => {
    it('should return success action to load all transactions', () => {
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

  describe('sortTransactions$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: TestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions, value: TestUtils.getTransactionsStateForEffects()
          },
        ]
      });
    });

    it('should return action with transactions sorted by Latest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 1})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.latest);
    });

    it('should return action with transactions sorted by Oldest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 2})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.oldest);
    });

    it('should return action with transactions sorted by A to Z', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 3})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.aToZ);
    });

    it('should return action with transactions sorted by Z to A', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 4})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.zToA);
    });

    it('should return action with transactions sorted by Highest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 5})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.highest);
    });

    it('should return action with transactions sorted by Lowest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 6})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.sortTransactions).toHaveBeenCalledWith(TestUtils.getTransactionsSorted(), Sort.lowest);
    });
  });

  describe('filterTransactions$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: TestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions, value: TestUtils.getTransactionsStateForEffects()
          },
        ]
      });
    });

    it('should return action with unfiltered transactions', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setCategoryFilter({category: -1})
      });

      const result = effects.filterTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TestUtils.getTransactions()
        }
      }));
      expect(Utils.filterTransactions).not.toHaveBeenCalled();
    });
    it('should return action with transactions filtered by category', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setCategoryFilter({category: 1})
      });

      const result = effects.filterTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.filterTransactions).toHaveBeenCalledWith(TestUtils.getTransactions(), 'General');
    });
  });

  describe('searchTransactions$', () => {
    it('should return action with transactions from search for a given category', () => {
      store = createMockStore({
        initialState: TestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions,
            value: {
              ...TestUtils.getTransactionsStateForEffects(),
              categoryFilter: 1
            }
          },
        ]
      });

      actions$ = hot('a', {
        a: TransactionsActions.search({search: 'search'})
      });

      const result = effects.searchTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.searchTransactions).toHaveBeenCalledWith(TestUtils.getTransactions(), 'search', 'General');
    });

    it('should return action with transactions from search for all transactions', () => {
      store = createMockStore({
        initialState: TestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions,
            value: {
              ...TestUtils.getTransactionsStateForEffects(),
              categoryFilter: -1
            }
          },
        ]
      });

      actions$ = hot('a', {
        a: TransactionsActions.search({search: 'search'})
      });

      const result = effects.searchTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TestUtils.getTransactionsSorted()
        }
      }));
      expect(Utils.searchTransactions).toHaveBeenCalledWith(TestUtils.getTransactions(), 'search');
    });
  });
});
