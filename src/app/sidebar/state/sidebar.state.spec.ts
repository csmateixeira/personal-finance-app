import {selectSidebarExpanded} from './sidebar.state';

describe('Sidebar Selectors', () => {
  it("should select expanded value", () => {
    const result: boolean = selectSidebarExpanded.projector({
      expanded: true,
    });

    expect(result).toBeTrue();
  });

});
