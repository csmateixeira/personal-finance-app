import {selectSidebarExpanded} from './sidebar.state';
import {Page} from '../../utils/models';

describe('Sidebar Selectors', () => {
  it("should select expanded value", () => {
    const result: boolean = selectSidebarExpanded.projector({
      expanded: true,
      activePage: Page.overview
    });

    expect(result).toBeTrue();
  });

});
