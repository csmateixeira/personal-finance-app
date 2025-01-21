import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Page} from "../../models/models";

export interface SidebarState {
  expanded: boolean;
  activePage: Page;
}

export const sidebarFeatureKey = 'sidebar';

export const selectSidebar = createFeatureSelector<SidebarState>(sidebarFeatureKey);

export const selectSidebarExpanded = createSelector(
  selectSidebar,
  (state: SidebarState) => state.expanded
);

export const selectActivePage = createSelector(
  selectSidebar,
  (state: SidebarState) => state.activePage
);


