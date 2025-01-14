import {
  selectTransactionsCategories,
  selectTransactionsCategoryFilter,
  selectTransactionsData,
  selectTransactionsFilteredData,
  selectTransactionsPage,
  selectTransactionsSortBy,
  selectTransactionsSorts
} from './transactions.state';
import {TestUtils} from '../../../../utils/test-utils';

describe('TransactionsSelectors', () => {
  it('should select all transactions data', () => {
    expect(selectTransactionsData.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(TestUtils.getTransactions());
  });

  it('should select all transactions filtered data', () => {
    expect(selectTransactionsFilteredData.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(TestUtils.getTransactionsSorted());
  });

  it('should select the current page', () => {
    expect(selectTransactionsPage.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(8);
  });

  it('should select the categories list', () => {
    expect(selectTransactionsCategories.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(TestUtils.getTransactionsCategories());
  });

  it('should select the current category filter', () => {
    expect(selectTransactionsCategoryFilter.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(2);
  });

  it('should select the sort options list', () => {
    expect(selectTransactionsSorts.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(TestUtils.getTransactionsSorts());
  });

  it('should select the current sort by filter', () => {
    expect(selectTransactionsSortBy.projector(TestUtils.getTransactionsStateForEffects()))
      .toEqual(5);
  });
});
