import {selectSidebarExpanded} from './sidebar.state';
import {Page} from '../../../utils/models';

describe('Sidebar Selectors', () => {
  it("should select expanded value", () => {
    expect(selectSidebarExpanded.projector({
      expanded: true,
      activePage: Page.overview
    })).toBeTrue();
  });

});
