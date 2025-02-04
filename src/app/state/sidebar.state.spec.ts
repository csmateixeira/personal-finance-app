import {selectSidebarExpanded} from './sidebar.state';
import {Page} from '../../models/models';

describe('Sidebar Selectors', () => {
  it("should select expanded value", () => {
    expect(selectSidebarExpanded.projector({
      expanded: true,
      activePage: Page.overview
    })).toBeTrue();
  });

});
