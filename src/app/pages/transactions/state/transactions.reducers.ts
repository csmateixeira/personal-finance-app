import {createReducer, on} from '@ngrx/store';
import {Sort, Transaction} from '../../../../utils/models';
import {TransactionsActions} from './transactions.actions';
import {produce} from 'immer';
import {TransactionsState} from './transactions.state';

export const initialState: Readonly<TransactionsState> = {
  data: [],
  categories: [],
  page: 1,
  sortBy: Sort.latest,
  categoryFilter: "All Transactions",
};

export const TransactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.transactionsLoaded, (_state, {transactions}) => produce(
    _state, draft => {
      draft.data = transactions;
      draft.categories = [
        ...new Set(transactions.map((t: Transaction) => t.category))
      ];
    }
  )),
  on(TransactionsActions.setPage, (_state, {page}) => produce(
    _state, draft => {
      draft.page = page;
    }
  )),
);
