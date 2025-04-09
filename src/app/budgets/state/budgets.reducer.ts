import {BudgetsState} from './budgets.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {BudgetsActions} from './budgets.actions';
import {produce} from 'immer';
import {Utils} from '../../shared/utils/utils';
import {Budget} from '../models/budget.model';
import {Theme} from '../../shared/models/theme.model';

export const initialState: Readonly<BudgetsState> = {
  data: [],
  themes: []
}

export const BudgetsReducer: ActionReducer<Readonly<BudgetsState>, Action> = createReducer(
  initialState,
  on(BudgetsActions.budgetsLoaded,
    (_state, {budgets}) => produce(
      _state, draft => {
        const themes: Theme[] = Utils.initializeThemes();

        budgets.forEach((budget: Budget) => {
          const themeIndex: number = themes.findIndex(theme => theme.color === budget.theme);
          themes[themeIndex].isUsed = true;
        });

        draft.data = budgets;
        draft.themes = themes;
      }
    )),
  on(BudgetsActions.budgetSpendingsUpdated, (_state, {budgets}) => produce(
    _state, draft => {
      draft.data = budgets;
    }
  )),
  on(BudgetsActions.deleteBudget, (_state, {category}) => produce(
    _state, draft => {
      const budget: Budget | undefined = _state.data.find(budget => budget.category === category);

      if (budget) {
        const themeIndex: number = _state.themes.findIndex(theme => theme.color === budget.theme);

        draft.data = draft.data.filter(budget => budget.category !== category);
        draft.themes[themeIndex].isUsed = false;
      }
    }
  )),
  on(BudgetsActions.budgetAdded, (_state, {newBudget}) => produce(
    _state, draft => {
      const themeIndex: number = _state.themes.findIndex(theme => theme.color === newBudget.theme);

      draft.data.push(newBudget);
      draft.themes[themeIndex].isUsed = true;
    }
  )),
  on(BudgetsActions.budgetEdited, (_state, {newBudget}) => produce(
    _state, draft => {
      const budgetIndex: number = _state.data.findIndex(budget => budget.category === newBudget.category);
      const budget: Budget = _state.data[budgetIndex];

      draft.data[budgetIndex].maximum = newBudget.maximum;

      if (budget.spent) {
        const remain: number = newBudget.maximum - budget.spent;

        draft.data[budgetIndex].percent = budget.spent > 0 ? Utils.roundNumber(budget.spent / newBudget.maximum) : 0;
        draft.data[budgetIndex].remaining = remain > 0 ? Utils.roundNumber(remain) : 0
      }
    }
  ))
);
