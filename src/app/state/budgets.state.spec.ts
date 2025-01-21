import {selectBudgetsData, selectBudgetsThemes} from './budgets.state';
import {BudgetsTestsUtils} from '../../utils/test-utils';

describe('BudgetsSelectors', () => {
  it('should select all budgets data', () => {
    expect(selectBudgetsData.projector(BudgetsTestsUtils.getBudgetsStateForEffects()))
      .toEqual(BudgetsTestsUtils.getBudgets());
  });

  it('should select budget themes', () => {
    expect(selectBudgetsThemes.projector(BudgetsTestsUtils.getBudgetsStateForEffects()))
      .toEqual(BudgetsTestsUtils.getBudgetsThemes());
  });
});
