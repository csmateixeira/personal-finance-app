import {createActionGroup, emptyProps, props} from '@ngrx/store';


import {Budget} from '../models/budget.model';

export const BudgetsActions = createActionGroup(
    {
        source: 'Budgets',
        events: {
            'Load Budgets': emptyProps(),
            'Budgets Loaded': props<{ budgets: Budget[] }>(),
            'Update Budget Spendings': emptyProps(),
            'Budget Spendings Updated': props<{ budgets: Budget[] }>(),
            'Delete Budget': props<{ category: string }>(),
            'Edit Budget': props<{ newBudget: Budget }>(),
            'Add Budget': props<{ newBudget: Budget }>(),
            'Budget Added': props<{ newBudget: Budget }>(),
        }
    }
);
