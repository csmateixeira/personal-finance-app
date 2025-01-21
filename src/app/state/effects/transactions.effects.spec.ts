import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';
import {TransactionsActions} from '../actions/transactions.actions';
import {TransactionsEffects} from './transactions.effects';
import {TransactionsTestUtils} from '../../../utils/test-utils';
import {TransactionsService} from '../../../services/transactions.service';
import {createMockStore, MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectTransactions, TransactionsState} from '../transactions.state';
import {Sort} from '../../../models/models';
import {TransactionsUtils} from '../../../utils/transactions-utils';

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

    spyOn(service, 'getAllTransactions').and.returnValue(of(TransactionsTestUtils.getTransactions()));
    spyOn(TransactionsUtils, 'sortTransactions').and.returnValue(TransactionsTestUtils.getTransactionsSorted());
    spyOn(TransactionsUtils, 'filterTransactions').and.returnValue(TransactionsTestUtils.getTransactionsSorted());
    spyOn(TransactionsUtils, 'searchTransactions').and.returnValue(TransactionsTestUtils.getTransactionsSorted());
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
          transactions: TransactionsTestUtils.getTransactions()
        }
      }));
      expect(service.getAllTransactions).toHaveBeenCalled();
    })
  });

  describe('sortTransactions$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: TransactionsTestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions, value: TransactionsTestUtils.getTransactionsStateForEffects()
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
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions).toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.latest);
    });

    it('should return action with transactions sorted by Oldest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 2})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.oldest);
    });

    it('should return action with transactions sorted by A to Z', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 3})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.aToZ);
    });

    it('should return action with transactions sorted by Z to A', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 4})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions).toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.zToA);
    });

    it('should return action with transactions sorted by Highest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 5})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.highest);
    });

    it('should return action with transactions sorted by Lowest', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setSortBy({sortBy: 6})
      });

      const result = effects.sortTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsSorted.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.sortTransactions).toHaveBeenCalledWith(TransactionsTestUtils.getTransactionsSorted(), Sort.lowest);
    });
  });

  describe('filterTransactions$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: TransactionsTestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions, value: TransactionsTestUtils.getTransactionsStateForEffects()
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
          transactions: TransactionsTestUtils.getTransactions()
        }
      }));
      expect(TransactionsUtils.filterTransactions).not.toHaveBeenCalled();
    });
    it('should return action with transactions filtered by category', () => {
      actions$ = hot('a', {
        a: TransactionsActions.setCategoryFilter({category: 1})
      });

      const result = effects.filterTransactions$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.filterTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactions(), 'General');
    });
  });

  describe('filterTransactionsByCategory$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: TransactionsTestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions, value: TransactionsTestUtils.getTransactionsStateForEffects()
          },
        ]
      });
    });

    it('should return action with transactions filtered by category name', () => {
      actions$ = hot('a', {
        a: TransactionsActions.updateCategoryFilter({category: 'Dining Out'})
      });

      const result = effects.filterTransactionsByCategory$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: TransactionsActions.transactionsFiltered.type,
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.filterTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactions(), 'Dining Out');
    });
  });

  describe('searchTransactions$', () => {
    it('should return action with transactions from search for a given category', () => {
      store = createMockStore({
        initialState: TransactionsTestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions,
            value: {
              ...TransactionsTestUtils.getTransactionsStateForEffects(),
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
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.searchTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactions(), 'search', 'General');
    });

    it('should return action with transactions from search for all transactions', () => {
      store = createMockStore({
        initialState: TransactionsTestUtils.getTransactionsStateForEffects(),
        selectors: [
          {
            selector: selectTransactions,
            value: {
              ...TransactionsTestUtils.getTransactionsStateForEffects(),
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
          transactions: TransactionsTestUtils.getTransactionsSorted()
        }
      }));
      expect(TransactionsUtils.searchTransactions)
        .toHaveBeenCalledWith(TransactionsTestUtils.getTransactions(), 'search');
    });
  });
});
