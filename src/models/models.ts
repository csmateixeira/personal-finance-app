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

export enum BudgetAction {
  add,
  edit,
  delete
}

export enum Colors {
  green = '#277C78',
  yellow = '#F2CDAC',
  cyan = '#82C9D7',
  navy = '#626070',
  red = '#C94736',
  purple = '#826CB0',
  turquoise = '#597C7C',
  brown = '#93674F',
  magenta = '#934F6F',
  blue = '#3F82B2',
  grey = '#97A0AC',
  army = '#7F9161',
  pink = '#AF81BA',
  gold = '#CAB361',
  orange = '#BE6C49',
}

export interface Option {
  id: number;
  value: string;
  prefix?: string;
  postfix?: string;
}

export interface Series {
  data: number[];
  themes: string[];
  totalSpending: number;
  totalBudget: number;
}
