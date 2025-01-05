import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Sort, Transaction} from '../../../../utils/models';

export interface TransactionsState {
  data: Transaction[];
  categories: string[];
  page: number;
  sortBy: Sort;
  categoryFilter: string;
}

export const transactionsFeatureKey = 'transactions';

export const selectTransactions = createFeatureSelector<TransactionsState>(transactionsFeatureKey);

export const selectTransactionsData = createSelector(
  selectTransactions,
  (state: TransactionsState): Transaction[] => state.data
);

export const selectTransactionsPage = createSelector(
  selectTransactions,
  (state: TransactionsState): number => state.page
);
