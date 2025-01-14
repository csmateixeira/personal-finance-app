import * as fromReducer from './transactions.reducers';
import {TestUtils} from '../../../../utils/test-utils';
import {TransactionsActions} from './transactions.actions';
import {TransactionsState} from './transactions.state';
import {Sort} from '../../../../utils/models';

describe('TransactionsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const {initialState} = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.TransactionsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  it('should save all transactions to state', () => {
    const action = TransactionsActions.transactionsLoaded({
      transactions: TestUtils.getTransactions()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getInitialState().transactions, action);

    expect(newState).toEqual({
      ...TestUtils.getInitialState().transactions,
      data: TestUtils.getTransactions(),
      filteredData: TestUtils.getTransactions(),
      categories: [
        {id: 1, value: 'General'},
        {id: 3, value: 'Dining Out'},
        {id: -1, value: 'All Transactions'}
      ],
      sorts: [
        {id: 1, value: Sort.latest},
        {id: 2, value: Sort.oldest},
        {id: 3, value: Sort.aToZ},
        {id: 4, value: Sort.zToA},
        {id: 5, value: Sort.highest},
        {id: 6, value: Sort.lowest}
      ]
    });
  });

  it('should save sorted transactions to state', () => {
    const action = TransactionsActions.transactionsSorted({
      transactions: TestUtils.getTransactionsSorted()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getTransactionsStateForEffects(), action);

    expect(newState).toEqual({
      ...TestUtils.getTransactionsStateForEffects(),
      filteredData: TestUtils.getTransactionsSorted()
    });
  });

  it('should save filtered transactions to state', () => {
    const action = TransactionsActions.transactionsFiltered({
      transactions: TestUtils.getTransactionsSorted()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getTransactionsStateForEffects(), action);

    expect(newState).toEqual({
      ...TestUtils.getTransactionsStateForEffects(),
      filteredData: TestUtils.getTransactionsSorted()
    });
  });

  it('should set the correct page in the state', () => {
    const action = TransactionsActions.setPage({
      page: 10
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TestUtils.getTransactionsStateForEffects(),
        page: 10
      });
  });

  it('should set the correct category filter in the state', () => {
    const action = TransactionsActions.setCategoryFilter({
      category: 3
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TestUtils.getTransactionsStateForEffects(),
        categoryFilter: 3
      });
  });

  it('should set the correct sort by filter in the state', () => {
    const action = TransactionsActions.setSortBy({
      sortBy: 2
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TestUtils.getTransactionsStateForEffects(),
        sortBy: 2
      });
  });
});
