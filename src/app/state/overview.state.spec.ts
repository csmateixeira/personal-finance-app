import {OverviewTestUtils} from '../../utils/test-utils';
import {selectOverviewBalance, selectOverviewExpenses, selectOverviewIncome} from './overview.state';

describe('OverviewSelectors', () => {
  it('should select overview balance', () => {
    expect(selectOverviewBalance.projector(OverviewTestUtils.getOverviewStateForEffects()))
      .toEqual(OverviewTestUtils.getOverviewStateForEffects().balance);
  });

   it('should select overview income', () => {
    expect(selectOverviewIncome.projector(OverviewTestUtils.getOverviewStateForEffects()))
      .toEqual(OverviewTestUtils.getOverviewStateForEffects().income);
  });

  it('should select overview expenses', () => {
    expect(selectOverviewExpenses.projector(OverviewTestUtils.getOverviewStateForEffects()))
      .toEqual(OverviewTestUtils.getOverviewStateForEffects().expenses);
  });
});
