import {Page, Sort, Transaction} from './models';
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
        categories: [],
        page: 1,
        sortBy: Sort.latest,
        categoryFilter: "All Transactions",
      }
    }
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
        id: '456',
        "avatar": "avatars/savory-bites-bistro.jpg",
        "name": "Savory Bites Bistro",
        "category": "Dining Out",
        "date": "2024-08-19T20:23:11Z",
        "amount": -55.50,
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
    ]
  }
}
