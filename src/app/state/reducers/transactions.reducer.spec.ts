import * as fromReducer from './transactions.reducer';
import {TestUtils, TransactionsTestUtils} from '../../../utils/test-utils';
import {TransactionsActions} from '../actions/transactions.actions';
import {TransactionsState} from '../transactions.state';
import {Sort} from '../../../models/models';

describe('TransactionsReducer', () => {
  it('should return the default state for unknown actions', () => {
    const {initialState} = fromReducer;
    const action = {
      type: 'Unknown',
    };
    const state: Readonly<TransactionsState> = fromReducer.TransactionsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should save all transactions to state', () => {
    const action = TransactionsActions.transactionsLoaded({
      transactions: TransactionsTestUtils.getTransactions()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TestUtils.getInitialState().transactions, action);

    expect(newState).toEqual({
      ...TestUtils.getInitialState().transactions,
      data: TransactionsTestUtils.getTransactions(),
      filteredData: TransactionsTestUtils.getTransactions(),
      categories: [
        {id: 1, value: 'General'},
        {id: 2, value: 'Dining Out'},
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
      transactions: TransactionsTestUtils.getTransactionsSorted()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

    expect(newState).toEqual({
      ...TransactionsTestUtils.getTransactionsStateForEffects(),
      filteredData: TransactionsTestUtils.getTransactionsSorted()
    });
  });

  it('should save filtered transactions to state', () => {
    const action = TransactionsActions.transactionsFiltered({
      transactions: TransactionsTestUtils.getTransactionsSorted()
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

    expect(newState).toEqual({
      ...TransactionsTestUtils.getTransactionsStateForEffects(),
      filteredData: TransactionsTestUtils.getTransactionsSorted()
    });
  });

  it('should set the correct page in the state', () => {
    const action = TransactionsActions.setPage({
      page: 10
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TransactionsTestUtils.getTransactionsStateForEffects(),
        page: 10
      });
  });

  it('should set the correct category filter in the state', () => {
    const action = TransactionsActions.setCategoryFilter({
      category: 3
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TransactionsTestUtils.getTransactionsStateForEffects(),
        categoryFilter: 3
      });
  });

  describe('updateCategoryFilter', () => {
    it('should update the correct category filter in the state', () => {
      const action = TransactionsActions.updateCategoryFilter({
        category: 'Dining Out'
      });

      const newState: Readonly<TransactionsState> =
        fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

      expect(newState)
        .toEqual({
          ...TransactionsTestUtils.getTransactionsStateForEffects(),
          categoryFilter: 3
        });
    });

    it('should update the category filter in the state with the default', () => {
      const action = TransactionsActions.updateCategoryFilter({
        category: 'Entertainment'
      });

      const newState: Readonly<TransactionsState> =
        fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

      expect(newState)
        .toEqual({
          ...TransactionsTestUtils.getTransactionsStateForEffects(),
          categoryFilter: -1
        });
    });
  });

  it('should set the correct sort by filter in the state', () => {
    const action = TransactionsActions.setSortBy({
      sortBy: 2
    });

    const newState: Readonly<TransactionsState> =
      fromReducer.TransactionsReducer(TransactionsTestUtils.getTransactionsStateForEffects(), action);

    expect(newState)
      .toEqual({
        ...TransactionsTestUtils.getTransactionsStateForEffects(),
        sortBy: 2
      });
  });
});
