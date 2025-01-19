import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Budget} from '../../../../utils/models';

export const BudgetsActions = createActionGroup(
    {
        source: 'Budgets',
        events: {
          'Load Budgets': emptyProps(),
          'Budgets Loaded': props<{ budgets: Budget[] }>(),
          'Delete Budget': props<{ category: string }>(),
        }
    }
);
