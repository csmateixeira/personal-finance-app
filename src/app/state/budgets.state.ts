import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Budget, BudgetsTheme} from '../../models/features.models';

export interface BudgetsState {
  data: Budget[];
  themes: BudgetsTheme[];
}

export const budgetsFeatureKey = 'budgets';

export const selectBudgets = createFeatureSelector<BudgetsState>(budgetsFeatureKey);

export const selectBudgetsData = createSelector(
  selectBudgets,
  (state: BudgetsState): Budget[] => state.data
);

export const selectBudgetsThemes = createSelector(
  selectBudgets,
  (state: BudgetsState): BudgetsTheme[] => state.themes
);
