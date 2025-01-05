import {Page} from './models';
import {SidebarState} from '../sidebar/state/sidebar.state';

export class TestUtils {
  static getInitialState(): {sidebar: SidebarState} {
    return {
      sidebar: {
        expanded: true,
        activePage: Page.overview
      }
    }
  }
}
