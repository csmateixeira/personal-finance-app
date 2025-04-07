import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Page} from "../../shared/models/page.model";

export const SidebarActions = createActionGroup(
    {
        source: 'Sidebar',
        events: {
            'Toggle Sidebar': emptyProps(),
            'Change Page': props<{page: Page}>(),
        }
    }
);
