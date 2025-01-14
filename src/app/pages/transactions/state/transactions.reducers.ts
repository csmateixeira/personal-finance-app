import {createReducer, on} from '@ngrx/store';
import {Sort, Transaction} from '../../../../utils/models';
import {TransactionsActions} from './transactions.actions';
import {produce} from 'immer';
import {TransactionsState} from './transactions.state';
import {Utils} from '../../../../utils/utils';

export const initialState: Readonly<TransactionsState> = {
  data: [],
  filteredData: [],
  categories: [],
  sorts: [],
  page: 1,
  sortBy: 1,
  categoryFilter: -1,
};

export const TransactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.transactionsLoaded,
    (_state, {transactions}) => produce(
      _state, draft => {
        draft.data = transactions;
        draft.filteredData = transactions;
        draft.categories = [
          ...Utils.getUniqueOptions(transactions.map((t: Transaction) => t.category)),
          {id: -1, value: "All Transactions"}
        ];
        draft.sorts = [
          {id: 1, value: Sort.latest},
          {id: 2, value: Sort.oldest},
          {id: 3, value: Sort.aToZ},
          {id: 4, value: Sort.zToA},
          {id: 5, value: Sort.highest},
          {id: 6, value: Sort.lowest}
        ];
      }
    )),
  on(TransactionsActions.transactionsSorted,
    TransactionsActions.transactionsFiltered,
    (_state, {transactions}) => produce(
      _state, draft => {
        draft.filteredData = transactions;
      }
    )),
  on(TransactionsActions.setPage, (_state, {page}) => produce(
    _state, draft => {
      draft.page = page;
    }
  )),
  on(TransactionsActions.setCategoryFilter, (_state, {category}) => produce(
    _state, draft => {
      draft.categoryFilter = category;
    }
  )),
  on(TransactionsActions.setSortBy, (_state, {sortBy}) => produce(
    _state, draft => {
      draft.sortBy = sortBy;
    }
  ))
);
