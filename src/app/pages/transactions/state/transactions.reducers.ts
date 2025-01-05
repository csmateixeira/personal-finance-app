import {createReducer, on} from '@ngrx/store';
import {Transaction} from '../../../../utils/models';
import {TransactionsActions} from './transactions.actions';

export const initialState: Readonly<Transaction[]> = [];

export const TransactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.transactionsLoaded, (_state, {transactions}) => transactions),
);
