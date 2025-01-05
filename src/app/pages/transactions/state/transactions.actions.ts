import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Transaction} from '../../../../utils/models';

export const TransactionsActions = createActionGroup(
    {
        source: 'Transactions',
        events: {
          'Load Transactions': emptyProps(),
          'Transactions Loaded': props<{ transactions: Transaction[] }>(),
          'Set Page': props<{ page: number }>(),
        }
    }
);
