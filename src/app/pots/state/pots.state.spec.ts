import {selectPotsData, selectPotsThemes} from './pots.state';
import {PotsTestsUtils} from '../../shared/utils/test-utils';

describe('PotsSelectors', () => {
  it('should select all pots data', () => {
    expect(selectPotsData.projector(PotsTestsUtils.getPotsStateForEffects()))
      .toEqual(PotsTestsUtils.getPots());
  });

  it('should select pot themes', () => {
    expect(selectPotsThemes.projector(PotsTestsUtils.getPotsStateForEffects()))
      .toEqual(PotsTestsUtils.getPotsThemes());
  });
});
