import {Colors, Option, Page, Sort} from '../models/models';
import {SidebarState} from '../app/state/sidebar.state';
import {TransactionsState} from "../app/state/transactions.state";
import {BudgetsState} from '../app/state/budgets.state';
import {Budget, Theme, Spending, Transaction, Pot} from '../models/features.models';
import {PotsState} from '../app/state/pots.state';

export class TestUtils {
  static getInitialState(): {
    sidebar: SidebarState,
    transactions: TransactionsState,
    budgets: BudgetsState,
    pots: PotsState,
  } {
    return {
      sidebar: {
        expanded: true,
        activePage: Page.overview
      },
      transactions: {
        data: [],
        filteredData: [],
        categories: [],
        sorts: [],
        page: 1,
        sortBy: 1,
        categoryFilter: -1,
      },
      budgets: {
        data: [],
        themes: []
      },
      pots: {
        data: [],
        themes: []
      }
    }
  }
}

export class TransactionsTestUtils {
  static getTransactionsStateForEffects(): TransactionsState {
    return {
      data: TransactionsTestUtils.getTransactions(),
      filteredData: TransactionsTestUtils.getTransactionsSorted(),
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
}

export class BudgetsTestsUtils {
  static getBudgetsStateForEffects(): BudgetsState {
    return {
      data: BudgetsTestsUtils.getBudgets(),
      themes: BudgetsTestsUtils.getBudgetsThemes()
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

  static getBudgetsThemes(): Theme[] {
    return [
      {
        id: 123,
        name: 'Green',
        color: Colors.green,
        isUsed: true
      },
      {
        id: 789,
        name: 'Cyan',
        color: Colors.cyan,
        isUsed: true
      },
      {
        id: 456,
        name: 'Orange',
        color: Colors.orange,
        isUsed: false
      }
    ]
  }

  static getInitialBudgetsThemes(): Theme[] {
    return [
      {
        id: 123,
        name: 'Green',
        color: Colors.green,
        isUsed: false
      },
      {
        id: 789,
        name: 'Cyan',
        color: Colors.cyan,
        isUsed: false
      },
      {
        id: 456,
        name: 'Orange',
        color: Colors.orange,
        isUsed: false
      }
    ]
  }

  static getUpdatedBudgets(): Budget[] {
    return [
      {
        ...BudgetsTestsUtils.getBudgets()[0],
        spent: 42.3,
        percent: 0.846,
        remaining: 7.7
      },
      {
        ...BudgetsTestsUtils.getBudgets()[1],
        spent: 0,
        percent: 0,
        remaining: 750
      }
    ]
  }
}

export class PotsTestsUtils {
  static getPots(): Pot[] {
    return [
      {
        id: '123',
        "name": "Savings",
        "target": 2000.00,
        "total": 159.00,
        "theme": Colors.green
      },
      {
        id: '456',
        "name": "Concert Ticket",
        "target": 150.00,
        "total": 110.00,
        "theme": Colors.orange
      },
      {
        id: '789',
        "name": "Gift",
        "target": 60.00,
        "total": 0,
        "theme": Colors.cyan
      },
    ];
  }

  static getPotsThemes(): Theme[] {
    return [
      {
        id: 123,
        name: 'Green',
        color: Colors.green,
        isUsed: true
      },
      {
        id: 789,
        name: 'Cyan',
        color: Colors.cyan,
        isUsed: true
      },
      {
        id: 987,
        name: 'Yellow',
        color: Colors.yellow,
        isUsed: false
      },
      {
        id: 456,
        name: 'Orange',
        color: Colors.orange,
        isUsed: true
      }
    ]
  }

  static getPotsStateForEffects(): PotsState {
    return {
      data: PotsTestsUtils.getPots(),
      themes: PotsTestsUtils.getPotsThemes()
    }
  }
}
