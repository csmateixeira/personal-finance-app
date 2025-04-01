import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Budget, Theme, Pot} from '../../models/features.models';

export interface PotsState {
  data: Pot[];
  themes: Theme[];
}

export const potsFeatureKey = 'pots';

export const selectPots = createFeatureSelector<PotsState>(potsFeatureKey);

export const selectPotsData = createSelector(
  selectPots,
  (state: PotsState): Pot[] => state.data
);

export const selectPotsThemes = createSelector(
  selectPots,
  (state: PotsState): Theme[] => state.themes
);
