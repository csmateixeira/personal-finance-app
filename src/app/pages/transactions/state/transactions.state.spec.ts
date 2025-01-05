import {selectTransactionsData} from './transactions.state';
import {TestUtils} from '../../../../utils/test-utils';
import {Sort} from '../../../../utils/models';

describe('TransactionsSelectors', () => {
  it('should select all transactions', () => {
    expect(selectTransactionsData.projector({
      data: TestUtils.getTransactions(),
      categories: ['General', 'Dining Out'],
      page: 1,
      sortBy: Sort.latest,
      categoryFilter: "All Transactions",
    }))
      .toEqual(TestUtils.getTransactions());
  });
});
