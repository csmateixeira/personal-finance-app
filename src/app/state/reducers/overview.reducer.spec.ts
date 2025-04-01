import * as fromReducer from './overview.reducer';
import {OverviewState} from '../overview.state';
import {OverviewActions} from '../actions/overview.actions';
import {TestUtils} from '../../../utils/test-utils';

describe('OverviewReducer', () => {
  it('should return the initial state', () => {
    const {initialState} = fromReducer;
    const action = {
      type: 'Unknown',
    };
    const state: Readonly<OverviewState> = fromReducer.OverviewReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should set the correct balance in the state', () => {
    const action = OverviewActions.overviewBalancesLoaded({
      balance: 1000,
      income: 2000,
      expenses: 1000
    });

    const newState: Readonly<OverviewState> = fromReducer.OverviewReducer(TestUtils.getInitialState().overview, action);

    expect(newState).toEqual({
      balance: 1000,
      income: 2000,
      expenses: 1000
    });
  });
});
