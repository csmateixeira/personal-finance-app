import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Pot} from '../../../models/features.models';

export const PotsActions = createActionGroup(
    {
        source: 'Pots',
        events: {
            'Load Pots': emptyProps(),
            'Pots Loaded': props<{ pots: Pot[] }>()
        }
    }
);
