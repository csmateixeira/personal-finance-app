import * as fromReducer from './budgets.reducer';
import {BudgetsState} from './budgets.state';
import {BudgetsTestsUtils, TestUtils} from '../../../../utils/test-utils';
import {BudgetsActions} from './budgets.actions';

describe('BudgetsReducer', () => {
  it('should return the default state', () => {
    const {initialState} = fromReducer;
    const action = {
      type: 'Unknown',
    };
    const state: Readonly<BudgetsState> = fromReducer.BudgetsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should save all budgets to state', () => {
    const action = BudgetsActions.budgetsLoaded({
      budgets: BudgetsTestsUtils.getBudgets()
    });

    const newState: Readonly<BudgetsState> =
      fromReducer.BudgetsReducer(TestUtils.getInitialState().budgets, action);

    expect(newState).toEqual({data: BudgetsTestsUtils.getBudgets()});
  });

  it('should delete budget by category', () => {
    const action = BudgetsActions.deleteBudget({
      category: 'General'
    });

    const state: Readonly<BudgetsState> = {
      data: BudgetsTestsUtils.getBudgets()
    };

    const newState: Readonly<BudgetsState> = fromReducer.BudgetsReducer(state, action);

    expect(newState).toEqual({data: [BudgetsTestsUtils.getBudgets()[1]]});
  });
});
