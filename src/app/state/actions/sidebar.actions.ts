import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Page} from '../../../models/models';

export const SidebarActions = createActionGroup(
    {
        source: 'Sidebar',
        events: {
            'Toggle Sidebar': emptyProps(),
            'Change Page': props<{page: Page}>(),
        }
    }
);
