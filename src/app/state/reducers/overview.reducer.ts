import {OverviewState} from '../overview.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {OverviewActions} from '../actions/overview.actions';
import {produce} from 'immer';

export const initialState: Readonly<OverviewState> = {
  balance: 0,
  income: 0,
  expenses: 0
}

export const OverviewReducer: ActionReducer<Readonly<OverviewState>, Action> = createReducer(
  initialState,
  on(OverviewActions.overviewBalancesLoaded,
    (_state, {balance, income, expenses}) => produce(
      _state, draft => {
        draft.balance = balance;
        draft.income = income;
        draft.expenses = expenses;
      }
    )
  )
);
