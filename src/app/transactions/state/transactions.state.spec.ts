import {
  selectTransactionsCategories,
  selectTransactionsCategoryFilter,
  selectTransactionsData,
  selectTransactionsFilteredData,
  selectTransactionsPage,
  selectTransactionsSortBy,
  selectTransactionsSorts
} from './transactions.state';
import {TransactionsTestUtils} from '../../shared/utils/test-utils';

describe('TransactionsSelectors', () => {
  it('should select all transactions data', () => {
    expect(selectTransactionsData.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(TransactionsTestUtils.getTransactions());
  });

  it('should select all transactions filtered data', () => {
    expect(selectTransactionsFilteredData.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(TransactionsTestUtils.getTransactionsSorted());
  });

  it('should select the current page', () => {
    expect(selectTransactionsPage.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(8);
  });

  it('should select the categories list', () => {
    expect(selectTransactionsCategories.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(TransactionsTestUtils.getTransactionsCategoryOptions());
  });

  it('should select the current category filter', () => {
    expect(selectTransactionsCategoryFilter.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(2);
  });

  it('should select the sort options list', () => {
    expect(selectTransactionsSorts.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(TransactionsTestUtils.getTransactionsSorts());
  });

  it('should select the current sort by filter', () => {
    expect(selectTransactionsSortBy.projector(TransactionsTestUtils.getTransactionsStateForEffects()))
      .toEqual(5);
  });
});
