import {selectTransactions} from './transactions.state';
import {TestUtils} from '../../../../utils/test-utils';

describe('TransactionsSelectors', () => {
  it('should select all transactions', () => {
    expect(selectTransactions.projector(TestUtils.getTransactions()))
      .toEqual(TestUtils.getTransactions());
  });
});
