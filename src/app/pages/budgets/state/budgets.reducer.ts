import {BudgetsState} from './budgets.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {BudgetsActions} from './budgets.actions';
import {produce} from 'immer';

export const initialState: Readonly<BudgetsState> = {
  data: []
}

export const BudgetsReducer: ActionReducer<Readonly<BudgetsState>, Action> = createReducer(
  initialState,
  on(BudgetsActions.budgetsLoaded,
    (_state, {budgets}) => produce(
      _state, draft => {
        draft.data = budgets;
      }
    ))
);
