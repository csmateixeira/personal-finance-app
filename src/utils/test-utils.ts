import {Option, Page, Sort, Transaction} from './models';
import {SidebarState} from '../app/sidebar/state/sidebar.state';
import {TransactionsState} from "../app/pages/transactions/state/transactions.state";

export class TestUtils {
  static getInitialState(): {sidebar: SidebarState, transactions: TransactionsState} {
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
      }
    }
  }

  static getTransactionsStateForEffects(): TransactionsState {
    return {
      data: TestUtils.getTransactions(),
      filteredData: TestUtils.getTransactionsSorted(),
      categories: TestUtils.getTransactionsCategories(),
      sorts: TestUtils.getTransactionsSorts(),
      page: 8,
      sortBy: 5,
      categoryFilter: 2,
    }
  }

  static getTransactionsCategories(): Option[] {
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
      },
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
