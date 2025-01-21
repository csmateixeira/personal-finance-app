import * as fromReducer from './sidebar.reducers';
import {SidebarActions} from '../actions/sidebar.actions';
import {TestUtils} from '../../../utils/test-utils';

describe('Sidebar Reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.SidebarReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('toggle sidebar action', () => {
    it('should toggle expanded to false when initial value is true', () => {
      const initialState = TestUtils.getInitialState().sidebar;
      const action = SidebarActions.toggleSidebar;

      expect(fromReducer.SidebarReducer(initialState, action)).toEqual({
        ...initialState,
        expanded: false,
      });
    });

    it('should toggle expanded to true when initial value is false', () => {
      const initialState = {
        ...TestUtils.getInitialState().sidebar,
        expanded: false,
      };
      const action = SidebarActions.toggleSidebar;
      const state = fromReducer.SidebarReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        expanded: true,
      });
    });
  });
});
