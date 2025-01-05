import * as fromReducer from './transactions.reducers';
import {TestUtils} from '../../../../utils/test-utils';
import {TransactionsActions} from './transactions.actions';

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
      expect(fromReducer.TransactionsReducer([], action))
        .toEqual(TestUtils.getTransactions());
    });
  });
});
