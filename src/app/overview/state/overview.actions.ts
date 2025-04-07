import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const OverviewActions = createActionGroup(
    {
        source: 'Overview',
        events: {
            'Load Overview Balances': emptyProps(),
            'Overview Balances Loaded': props<{ balance: number, income: number, expenses: number }>()
        }
    }
);
