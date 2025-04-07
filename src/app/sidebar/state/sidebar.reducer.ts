import {createReducer, on} from '@ngrx/store';
import {SidebarState} from './sidebar.state';
import {SidebarActions} from './sidebar.actions';
import {produce} from "immer";

import {Page} from "../../shared/models/page.model";

export const initialState: Readonly<SidebarState> = {
    expanded: true,
    activePage: Page.overview,
};

export const SidebarReducer = createReducer(
    initialState,
    on(SidebarActions.toggleSidebar, (_state) => produce(_state, draft => {
        draft.expanded = !_state.expanded;
    })),
    on(SidebarActions.changePage, (_state, {page}) => produce(_state, draft => {
        draft.activePage = page;
    }))
);
