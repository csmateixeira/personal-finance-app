import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {Option, Sort} from '../../../models/models';
import {TransactionsActions} from '../actions/transactions.actions';
import {produce} from 'immer';
import {TransactionsState} from '../transactions.state';
import {Utils} from '../../../utils/utils';
import {Transaction} from '../../../models/features.models';

export const initialState: Readonly<TransactionsState> = {
  data: [],
  filteredData: [],
  categories: [],
  sorts: [],
  page: 1,
  sortBy: 1,
  categoryFilter: -1,
};

export const TransactionsReducer: ActionReducer<Readonly<TransactionsState>, Action> = createReducer(
  initialState,
  on(TransactionsActions.transactionsLoaded,
    (_state, {transactions}) => produce(
      _state, draft => {
        const categories: string[] = Utils.getUniqueValues(transactions.map((t: Transaction) => t.category));

        draft.data = transactions;
        draft.filteredData = transactions;
        draft.categories = [
          ...Utils.getUniqueOptions(categories),
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
  on(TransactionsActions.updateCategoryFilter, (_state, {category}) => produce(
    _state, draft => {
      draft.categoryFilter = _state.categories
        .find((option: Option) => option.value === category)?.id ?? -1;
    }
  )),
  on(TransactionsActions.setSortBy, (_state, {sortBy}) => produce(
    _state, draft => {
      draft.sortBy = sortBy;
    }
  ))
);
