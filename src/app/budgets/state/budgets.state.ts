import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Budget} from '../models/budget.model';
import {Theme} from '../../shared/models/theme.model';

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
