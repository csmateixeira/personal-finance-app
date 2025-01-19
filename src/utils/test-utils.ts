import {Budget, BudgetSpending, Option, Page, Sort, Spending, Transaction} from './models';
import {SidebarState} from '../app/sidebar/state/sidebar.state';
import {TransactionsState} from "../app/pages/transactions/state/transactions.state";
import {BudgetsState} from '../app/pages/budgets/state/budgets.state';

export class TestUtils {
  static getInitialState(): {
    sidebar: SidebarState,
    transactions: TransactionsState,
    budgets: BudgetsState
  } {
    return {
      sidebar: {
        expanded: true,
        activePage: Page.overview
      },
      transactions: {
        data: [],
        filteredData: [],
        spendings: [],
        categories: [],
        sorts: [],
        page: 1,
        sortBy: 1,
        categoryFilter: -1,
      },
      budgets: {
        data: []
      }
    }
  }
}

export class TransactionsTestUtils {
  static getTransactionsStateForEffects(): TransactionsState {
    return {
      data: TransactionsTestUtils.getTransactions(),
      filteredData: TransactionsTestUtils.getTransactionsSorted(),
      spendings: TransactionsTestUtils.getSpendings(),
      categories: TransactionsTestUtils.getTransactionsCategoryOptions(),
      sorts: TransactionsTestUtils.getTransactionsSorts(),
      page: 8,
      sortBy: 5,
      categoryFilter: 2,
    }
  }

  static getTransactionsCategoryOptions(): Option[] {
    return [
      {id: 1, value: 'General'},
      {id: 3, value: 'Dining Out'},
    ]
  }

  static getTransactionsSorts(): Option[] {
    return [
      {id: 1, value: Sort.latest},
      {id: 2, value: Sort.oldest},
      {id: 3, value: Sort.aToZ},
      {id: 4, value: Sort.zToA},
      {id: 5, value: Sort.highest},
      {id: 6, value: Sort.lowest}
    ]
  }

  static getTransactions(): Transaction[] {
    return [
      {
        id: '123',
        "avatar": "avatars/emma-richardson.jpg",
        "name": "Emma Richardson",
        "category": "General",
        "date": "2024-08-19T14:23:11Z",
        "amount": 75.50,
        "recurring": false
      },
      {
        id: '789',
        "avatar": "avatars/daniel-carter.jpg",
        "name": "Daniel Carter",
        "category": "General",
        "date": "2024-08-18T09:45:32Z",
        "amount": -42.30,
        "recurring": false
      },
      {
        id: '456',
        "avatar": "avatars/savory-bites-bistro.jpg",
        "name": "Savory Bites Bistro",
        "category": "Dining Out",
        "date": "2024-08-19T20:23:11Z",
        "amount": -55.50,
        "recurring": false
      }
    ]
  }

  static getTransactionsSorted(): Transaction[] {
    return [
      {
        id: '789',
        "avatar": "avatars/daniel-carter.jpg",
        "name": "Daniel Carter",
        "category": "General",
        "date": "2024-08-18T09:45:32Z",
        "amount": -42.30,
        "recurring": false
      },
      {
        id: '123',
        "avatar": "avatars/emma-richardson.jpg",
        "name": "Emma Richardson",
        "category": "General",
        "date": "2024-08-19T14:23:11Z",
        "amount": 75.50,
        "recurring": false
      },
      {
        id: '456',
        "avatar": "avatars/savory-bites-bistro.jpg",
        "name": "Savory Bites Bistro",
        "category": "Dining Out",
        "date": "2024-08-19T20:23:11Z",
        "amount": -55.50,
        "recurring": false
      },
    ]
  }

  static getSpendings(): Spending[] {
    return [
      {category: 'General', amount: 42.3},
      {category: 'Dining Out', amount: 55.50}
    ]
  }
}

export class BudgetsTestsUtils {
  static getBudgetsStateForEffects(): BudgetsState {
    return {
      data: BudgetsTestsUtils.getBudgets(),
    }
  }

  static getBudgets(): Budget[] {
    return [
      {
        id: '123',
        "category": "General",
        "maximum": 50.00,
        "theme": "#277C78"
      },
      {
        id: '456',
        "category": "Bills",
        "maximum": 750.00,
        "theme": "#82C9D7"
      },
    ]
  }

  static getBudgetSpending(): BudgetSpending {
    return {
      id: '123',
      "category": "General",
      "maximum": 50.00,
      "theme": "#277C78",
      spent: 42.3,
      remaining: 7.70,
      percent: 0.846
    };
  }
}
