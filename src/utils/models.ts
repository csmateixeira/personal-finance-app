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

export interface Option {
  id: number;
  value: string;
}

export interface Series {
  data: number[];
  themes: string[];
  totalSpending: number;
  totalBudget: number;
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
}

export interface BudgetSpending extends Budget {
  spent: number;
  percent?: number;
  remaining?: number;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}
