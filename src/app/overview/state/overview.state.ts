import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface OverviewState {
  balance: number;
  income: number;
  expenses: number;
}

export const overviewFeatureKey = 'overview';

export const selectOverview = createFeatureSelector<OverviewState>(overviewFeatureKey);

export const selectOverviewBalance = createSelector(
  selectOverview,
  (state: OverviewState): number => state.balance
);

export const selectOverviewIncome = createSelector(
  selectOverview,
  (state: OverviewState): number => state.income
);

export const selectOverviewExpenses = createSelector(
  selectOverview,
  (state: OverviewState): number => state.expenses
);
