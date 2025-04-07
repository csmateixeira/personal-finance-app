import {selectSidebarExpanded} from './sidebar.state';

import {Page} from "../../shared/models/page.model";

describe('Sidebar Selectors', () => {
  it("should select expanded value", () => {
    expect(selectSidebarExpanded.projector({
      expanded: true,
      activePage: Page.overview
    })).toBeTrue();
  });

});
