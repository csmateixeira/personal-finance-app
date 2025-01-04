import * as fromReducer from './sidebar.reducers';
import {SidebarActions} from './sidebar.actions';

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
      const initialState = {
        expanded: true,
      };
      const action = SidebarActions.toggleSidebar;
      const state = fromReducer.SidebarReducer(initialState, action);

      expect(state).toEqual({
        expanded: false,
      });
    });

    it('should toggle expanded to true when initial value is false', () => {
      const initialState = {
        expanded: false,
      };
      const action = SidebarActions.toggleSidebar;
      const state = fromReducer.SidebarReducer(initialState, action);

      expect(state).toEqual({
        expanded: true,
      });
    });
  });
});
