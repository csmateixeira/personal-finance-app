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
    )),
  on(BudgetsActions.deleteBudget, (_state, {category}) => produce(
    _state, draft => {
      draft.data = draft.data.filter(budget => budget.category !== category);
    }
  ))
);
