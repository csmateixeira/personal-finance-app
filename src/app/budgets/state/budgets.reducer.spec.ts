import * as fromReducer from './budgets.reducer';
import {BudgetsState} from './budgets.state';
import {BudgetsTestsUtils, TestUtils} from '../../shared/utils/test-utils';
import {BudgetsActions} from './budgets.actions';
import {Utils} from '../../shared/utils/utils';
import {Budget} from '../models/budget.model';

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
    spyOn(Utils, 'initializeThemes').and.returnValue(BudgetsTestsUtils.getInitialBudgetsThemes());

    const action = BudgetsActions.budgetsLoaded({
      budgets: BudgetsTestsUtils.getBudgets()
    });

    const newState: Readonly<BudgetsState> =
      fromReducer.BudgetsReducer(TestUtils.getInitialState().budgets, action);

    expect(newState).toEqual({
      data: BudgetsTestsUtils.getBudgets(),
      themes: BudgetsTestsUtils.getBudgetsThemes()
    });
  });

  it('should delete budget by category', () => {
    const action = BudgetsActions.deleteBudget({
      category: 'General'
    });

    const state: Readonly<BudgetsState> = {
      data: BudgetsTestsUtils.getBudgets(),
      themes: BudgetsTestsUtils.getBudgetsThemes()
    };

    const newState: Readonly<BudgetsState> = fromReducer.BudgetsReducer(state, action);

    expect(newState).toEqual({
      data: [BudgetsTestsUtils.getBudgets()[1]],
      themes: [
        {
          ...BudgetsTestsUtils.getBudgetsThemes()[0],
          isUsed: false
        },
        BudgetsTestsUtils.getBudgetsThemes()[1],
        BudgetsTestsUtils.getBudgetsThemes()[2]
      ]
    });
  });

  it('should add a new budget', () => {
    const newBudget: Budget = {
      id: '789',
      "category": "Entertainment",
      "maximum": 100.00,
      "theme": "Orange"
    };
    const action = BudgetsActions.addBudget({newBudget});

    const state: Readonly<BudgetsState> = {
      data: BudgetsTestsUtils.getBudgets(),
      themes: BudgetsTestsUtils.getBudgetsThemes()
    };

    const newState: Readonly<BudgetsState> = fromReducer.BudgetsReducer(state, action);

    expect(newState).toEqual({
      data: [
        ...BudgetsTestsUtils.getBudgets(),
        {
          ...newBudget,
          theme: '#BE6C49'
        }
      ],
      themes: [
        BudgetsTestsUtils.getBudgetsThemes()[0],
        BudgetsTestsUtils.getBudgetsThemes()[1],
        {
          ...BudgetsTestsUtils.getBudgetsThemes()[2],
          isUsed: true
        }
      ]
    });
  });

  it('should edit a budget', () => {
    const newBudget: Budget = {
      ...BudgetsTestsUtils.getBudgets()[0],
      maximum: 175.00,
    };
    const action = BudgetsActions.editBudget({newBudget});

    const state: Readonly<BudgetsState> = {
      data: [
        {
          ...BudgetsTestsUtils.getBudgets()[0],
          maximum: 200.00,
          spent: 150.00,
        },
        BudgetsTestsUtils.getBudgets()[1]
      ],
      themes: BudgetsTestsUtils.getBudgetsThemes()
    };

    const newState: Readonly<BudgetsState> = fromReducer.BudgetsReducer(state, action);

    expect(newState).toEqual({
      data: [
        {
          ...BudgetsTestsUtils.getBudgets()[0],
          maximum: 175.00,
          spent: 150.00,
          percent: 0.86,
          remaining: 25
        },
        BudgetsTestsUtils.getBudgets()[1]
      ],
      themes: BudgetsTestsUtils.getBudgetsThemes()
    });
  });

  it('should update budget spendings', () => {
    const updatedBudgets: Budget[] = BudgetsTestsUtils.getUpdatedBudgets();

    const state: Readonly<BudgetsState> = {
      data: BudgetsTestsUtils.getBudgets(),
      themes: BudgetsTestsUtils.getBudgetsThemes()
    };

    const newState: Readonly<BudgetsState> = fromReducer.BudgetsReducer(state, BudgetsActions.budgetSpendingsUpdated({budgets: updatedBudgets}));

    expect(newState).toEqual({
      data: updatedBudgets,
      themes: BudgetsTestsUtils.getBudgetsThemes()
    });
  });
});
