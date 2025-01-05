import * as fromReducer from './transactions.reducers';
import {TestUtils} from '../../../../utils/test-utils';
import {TransactionsActions} from './transactions.actions';
import {TransactionsState} from './transactions.state';

describe('TransactionsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.TransactionsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('transactions loaded action', () => {
    it('should save all transactions to state', () => {
      const action = TransactionsActions.transactionsLoaded({
        transactions: TestUtils.getTransactions()
      });

      const newState: Readonly<TransactionsState> =
        fromReducer.TransactionsReducer(TestUtils.getInitialState().transactions, action);

      expect(newState)
        .toEqual({
          ...TestUtils.getInitialState().transactions,
          data: TestUtils.getTransactions(),
          categories: ['General', 'Dining Out']
        });
    });

    it('should set the correct page in the state', () => {
      const action = TransactionsActions.setPage({
        page: 10
      });

      const newState: Readonly<TransactionsState> =
        fromReducer.TransactionsReducer(TestUtils.getInitialState().transactions, action);

      expect(newState)
        .toEqual({
          ...TestUtils.getInitialState().transactions,
          page: 10
        });
    });
  });
});
