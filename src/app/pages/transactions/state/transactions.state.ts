import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Option, Spending, Transaction} from '../../../../utils/models';

export interface TransactionsState {
  data: Transaction[];
  filteredData: Transaction[];
  spendings: Spending[];
  categories: Option[];
  sorts: Option[];
  page: number;
  sortBy: number;
  categoryFilter: number;
}

export const transactionsFeatureKey = 'transactions';

export const selectTransactions = createFeatureSelector<TransactionsState>(transactionsFeatureKey);

export const selectTransactionsData = createSelector(
  selectTransactions,
  (state: TransactionsState): Transaction[] => state.data
);

export const selectTransactionsFilteredData = createSelector(
  selectTransactions,
  (state: TransactionsState): Transaction[] => state.filteredData
);

export const selectTransactionsSpendings = createSelector(
  selectTransactions,
  (state: TransactionsState): Spending[] => state.spendings
);

export const selectTransactionsPage = createSelector(
  selectTransactions,
  (state: TransactionsState): number => state.page
);

export const selectTransactionsCategories = createSelector(
  selectTransactions,
  (state: TransactionsState): Option[] => state.categories
);

export const selectTransactionsCategoryFilter = createSelector(
  selectTransactions,
  (state: TransactionsState): number => state.categoryFilter
);

export const selectTransactionsSorts = createSelector(
  selectTransactions,
  (state: TransactionsState): Option[] => state.sorts
);


export const selectTransactionsSortBy = createSelector(
  selectTransactions,
  (state: TransactionsState): number => state.sortBy
);
