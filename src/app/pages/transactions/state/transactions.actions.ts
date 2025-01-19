import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Transaction} from '../../../../utils/models';

export const TransactionsActions = createActionGroup(
    {
        source: 'Transactions',
        events: {
          'Load Transactions': emptyProps(),
          'Transactions Loaded': props<{ transactions: Transaction[] }>(),
          'Set Page': props<{ page: number }>(),
          'Set Category Filter': props<{ category: number }>(),
          'Update Category Filter': props<{ category: string }>(),
          'Set Sort By': props<{ sortBy: number }>(),
          'Transactions Sorted': props<{ transactions: Transaction[] }>(),
          'Transactions Filtered': props<{ transactions: Transaction[] }>(),
          'Search': props<{ search: string }>(),
        }
    }
);
