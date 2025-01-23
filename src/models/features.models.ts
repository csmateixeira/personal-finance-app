import {Colors} from './models';

export interface Transaction {
  id?: string;
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Spending {
  category: string;
  amount: number;
}

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Budget {
  id?: string;
  category: string;
  maximum: number;
  theme: string;

  spent?: number;
  percent?: number;
  remaining?: number;
}

export interface BudgetsTheme {
  id: number;
  name: string;
  color: Colors;
  isUsed: boolean;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}
