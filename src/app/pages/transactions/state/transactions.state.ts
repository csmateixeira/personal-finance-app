import {createFeatureSelector} from '@ngrx/store';
import {Transaction} from '../../../../utils/models';

export const transactionsFeatureKey = 'transactions';

export const selectTransactions = createFeatureSelector<Transaction[]>(transactionsFeatureKey);

