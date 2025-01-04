import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface SidebarState {
  expanded: boolean;
}

export const sidebarFeatureKey = 'sidebar';

export const selectSidebar = createFeatureSelector<SidebarState>(sidebarFeatureKey);

export const selectSidebarExpanded = createSelector(
  selectSidebar,
  (state: SidebarState) => state.expanded
);

