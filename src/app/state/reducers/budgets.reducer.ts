import {BudgetsState} from '../budgets.state';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {BudgetsActions} from '../actions/budgets.actions';
import {produce} from 'immer';
import {Budget, BudgetsTheme} from '../../../models/features.models';
import {BudgetsUtils} from '../../../utils/budgets-utils';

export const initialState: Readonly<BudgetsState> = {
  data: [],
  themes: []
}

export const BudgetsReducer: ActionReducer<Readonly<BudgetsState>, Action> = createReducer(
  initialState,
  on(BudgetsActions.budgetsLoaded,
    (_state, {budgets}) => produce(
      _state, draft => {
        const themes: BudgetsTheme[] = BudgetsUtils.initializeBudgetThemes();

        budgets.forEach((budget: Budget) => {
          const themeIndex: number = themes.findIndex(theme => theme.color === budget.theme);
          themes[themeIndex].isUsed = true;
        });

        draft.data = budgets;
        draft.themes = themes;
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
  on(BudgetsActions.addBudget, (_state, {newBudget}) => produce(
    _state, draft => {
      const themeIndex: number = _state.themes.findIndex(theme => theme.name === newBudget.theme);

      draft.data.push({
        ...newBudget,
        theme: _state.themes[themeIndex].color
      });
      draft.themes[themeIndex].isUsed = true;
    }
  )),
  on(BudgetsActions.editBudget, (_state, {newBudget}) => produce(
    _state, draft => {
      const budgetIndex: number = _state.data.findIndex(budget => budget.category === newBudget.category);

      draft.data[budgetIndex].maximum = newBudget.maximum;
    }
  ))
);
