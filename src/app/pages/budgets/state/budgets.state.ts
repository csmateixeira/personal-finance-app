import {Budget} from '../../../../utils/models';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface BudgetsState {
  data: Budget[];
}

export const budgetsFeatureKey = 'budgets';

export const selectBudgets = createFeatureSelector<BudgetsState>(budgetsFeatureKey);

export const selectBudgetsData = createSelector(
  selectBudgets,
  (state: BudgetsState): Budget[] => state.data
);
