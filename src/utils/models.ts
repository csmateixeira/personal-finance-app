export enum Page {
  overview = 'overview',
  transactions = 'transactions',
  budgets = 'budgets',
  pots = 'pots',
  bills = 'bills'
}

export enum Sort {
  latest = 'Latest',
  oldest = 'Oldest',
  aToZ = 'A to Z',
  zToA = 'Z to A',
  highest = 'Highest',
  lowest = 'Lowest',
}

export interface Transaction {
  id?: string;
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}
