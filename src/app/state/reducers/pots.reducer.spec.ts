import * as fromReducer from './pots.reducer';
import {PotsTestsUtils, TestUtils} from '../../../utils/test-utils';
import {PotsActions} from '../actions/pots.actions';
import {PotsState} from '../pots.state';
import {Utils} from '../../../utils/utils';

describe('PotsReducer', () => {
  it('should return the default state', () => {
    const {initialState} = fromReducer;
    const action = {
      type: 'Unknown',
    };
    const state: Readonly<PotsState> = fromReducer.PotsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should save all pots to state', () => {
    spyOn(Utils, 'initializeThemes').and.returnValue(PotsTestsUtils.getPotsThemes());

    const action = PotsActions.potsLoaded({
      pots: PotsTestsUtils.getPots()
    });

    const newState: Readonly<PotsState> =
      fromReducer.PotsReducer(TestUtils.getInitialState().pots, action);

    expect(newState).toEqual({
      data: PotsTestsUtils.getPots(),
      themes: PotsTestsUtils.getPotsThemes()
    });
  });
});
