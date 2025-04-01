import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Budget, Theme} from '../../models/features.models';

export interface BudgetsState {
  data: Budget[];
  themes: Theme[];
}

export const budgetsFeatureKey = 'budgets';

export const selectBudgets = createFeatureSelector<BudgetsState>(budgetsFeatureKey);

export const selectBudgetsData = createSelector(
  selectBudgets,
  (state: BudgetsState): Budget[] => state.data
);

export const selectBudgetsThemes = createSelector(
  selectBudgets,
  (state: BudgetsState): Theme[] => state.themes
);
