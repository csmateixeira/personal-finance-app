import {SidebarState} from '../../sidebar/state/sidebar.state';
import {TransactionsState} from "../../transactions/state/transactions.state";
import {BudgetsState} from '../../budgets/state/budgets.state';
import {PotsState} from '../../pots/state/pots.state';
import {OverviewState} from '../../overview/state/overview.state';
import {Budget} from '../../budgets/models/budget.model';
import {Theme} from '../models/theme.model';
import {Option} from '../models/option.model';
import {Colors} from '../models/colors.model';
import {Sort} from '../models/sort.model';
import {Page} from '../models/page.model';
import {Transaction} from '../../transactions/models/transaction.model';
import {Pot} from '../../pots/models/pot.model';
import {Balance} from '../../overview/models/balance.model';

export class TestUtils {
  static getInitialState(): {
    sidebar: SidebarState,
    transactions: TransactionsState,
    budgets: BudgetsState,
    pots: PotsState,
    overview: OverviewState
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
      },
      overview: {
        balance: 0,
        income: 0,
        expenses: 0
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

export class OverviewTestUtils {

  static getOverviewStateForEffects(): OverviewState {
    return {
      balance: 1500,
      income: 2000.25,
      expenses: 500.50
    }
  }

  static getOverviewBalances(): Balance {
    return {
      current: 1500,
      income: 2000.25,
      expenses: 500.50
    }
  }
}
