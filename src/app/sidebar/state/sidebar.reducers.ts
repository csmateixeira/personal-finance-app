import {createReducer, on} from '@ngrx/store';
import {SidebarState} from './sidebar.state';
import {SidebarActions} from './sidebar.actions';

export const initialState: Readonly<SidebarState> = {
  expanded: true
};

export const SidebarReducer = createReducer(
  initialState,
  on(SidebarActions.toggleSidebar, (_state) => ({
    expanded: !_state.expanded,
  }))
);
