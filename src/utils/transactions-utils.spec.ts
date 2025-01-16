import {TransactionsUtils} from './transactions-utils';
import {TransactionsTestUtils} from './test-utils';
import {Sort, Spending} from './models';

describe('TransactionsUtils', () => {
  it('should return the correct page data', () => {
    const data = [
      {id: 1, amount: 10},
      {id: 2, amount: 20},
      {id: 3, amount: 30},
      {id: 4, amount: 40},
      {id: 5, amount: 50},
      {id: 6, amount: 60},
      {id: 7, amount: 70},
      {id: 8, amount: 80},
      {id: 9, amount: 90},
      {id: 10, amount: 100},
      {id: 11, amount: 110},
      {id: 12, amount: 120},
      {id: 13, amount: 130},
      {id: 14, amount: 140},
      {id: 15, amount: 150},
      {id: 16, amount: 160},
      {id: 17, amount: 170},
      {id: 18, amount: 180},
      {id: 19, amount: 190},
      {id: 20, amount: 200},
    ];
    const page1 = [
      {id: 1, amount: 10},
      {id: 2, amount: 20},
      {id: 3, amount: 30},
      {id: 4, amount: 40},
      {id: 5, amount: 50},
      {id: 6, amount: 60},
      {id: 7, amount: 70},
      {id: 8, amount: 80},
      {id: 9, amount: 90},
      {id: 10, amount: 100},
    ];
    const page2 = [
      {id: 11, amount: 110},
      {id: 12, amount: 120},
      {id: 13, amount: 130},
      {id: 14, amount: 140},
      {id: 15, amount: 150},
      {id: 16, amount: 160},
      {id: 17, amount: 170},
      {id: 18, amount: 180},
      {id: 19, amount: 190},
      {id: 20, amount: 200},
    ]

    expect(TransactionsUtils.getPageData(data, 1)).toEqual(page1);
    expect(TransactionsUtils.getPageData(data, 2)).toEqual(page2);
  });

  describe('sortTransactions', () => {
    it('should sort transactions by latest date', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.latest))
        .toEqual([
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
        ]);
    });

    it('should sort transactions by oldest date', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.oldest))
        .toEqual([
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
          }
        ]);
    });

    it('should sort transactions by lowest amount', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.lowest))
        .toEqual([
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
          {
            id: '123',
            "avatar": "avatars/emma-richardson.jpg",
            "name": "Emma Richardson",
            "category": "General",
            "date": "2024-08-19T14:23:11Z",
            "amount": 75.50,
            "recurring": false
          },
        ]);
    });

    it('should sort transactions by highest amount', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.highest))
        .toEqual([
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
          }
        ]);
    });

    it('should sort transactions by name from A to Z', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.aToZ))
        .toEqual([
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
          }
        ]);
    });

    it('should sort transactions by name from Z to A', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, Sort.zToA))
        .toEqual([
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
        ]);
    });

    it('should sort transactions by latest date as default', () => {
      const transactions = TransactionsTestUtils.getTransactions();

      expect(TransactionsUtils.sortTransactions(transactions, 'unknown'))
        .toEqual([
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
        ]);
    });
  });

  it('should filter transactions by category name', () => {
    expect(TransactionsUtils.filterTransactions(TransactionsTestUtils.getTransactions(), 'General'))
      .toEqual([
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
        }
      ]);
  });

  describe('searchTransactions', () => {
    it('should search for transactions in a given category', () => {
      const transactions = [
        ...TransactionsTestUtils.getTransactions(),
        {
          id: '987',
          "avatar": "avatars/emma-richardson.jpg",
          "name": "Emma Richardson",
          "category": "Dining Out",
          "date": "2024-08-19T14:23:11Z",
          "amount": 75.50,
          "recurring": false
        },
      ];

      expect(TransactionsUtils.searchTransactions(transactions, 'emma', 'General'))
        .toEqual([
          {
            id: '123',
            "avatar": "avatars/emma-richardson.jpg",
            "name": "Emma Richardson",
            "category": "General",
            "date": "2024-08-19T14:23:11Z",
            "amount": 75.50,
            "recurring": false
          }
        ]);
    });

    it('should search for transactions in all transactions', () => {
      const transactions = [
        ...TransactionsTestUtils.getTransactions(),
        {
          id: '987',
          "avatar": "avatars/emma-richardson.jpg",
          "name": "Emma Richardson",
          "category": "Dining Out",
          "date": "2024-08-19T14:23:11Z",
          "amount": 75.50,
          "recurring": false
        },
      ];

      expect(TransactionsUtils.searchTransactions(transactions, 'emma'))
        .toEqual([
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
            id: '987',
            "avatar": "avatars/emma-richardson.jpg",
            "name": "Emma Richardson",
            "category": "Dining Out",
            "date": "2024-08-19T14:23:11Z",
            "amount": 75.50,
            "recurring": false
          },
        ]);
    });
  });

  it('should get the current month spendings from the transactions list', () => {
    const result: Spending[] = TransactionsUtils.getSpendings(
      TransactionsTestUtils.getTransactions(),
      ['General'],
      7
    );

    expect(result).toEqual([
      {
        category: 'General',
        amount: 42.3
      }
    ])
  });
});
