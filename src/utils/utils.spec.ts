import {Utils} from './utils';
import {TestUtils} from './test-utils';
import {Sort} from './models';

describe('Utils', () => {
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

    expect(Utils.getPageData(data, 1)).toEqual(page1);
    expect(Utils.getPageData(data, 2)).toEqual(page2);
  });

  it('should return the list of unique options', () => {
    expect(Utils.getUniqueOptions(['a', 'b', 'a', 'c', 'b'])).toEqual([
      {id: 1, value: 'a'},
      {id: 2, value: 'b'},
      {id: 4, value: 'c'},
    ]);
  });

  describe('isBefore', () => {
    it('should return true if date a is before date b', () => {
      const date1 = new Date('2024-08-19T14:23:11Z');
      const date2 = new Date('2024-08-20T14:23:11Z');

      expect(Utils.isBefore(date1, date2)).toBeTrue();
    });

    it('should return false if date a is after date b', () => {
      const date1 = new Date('2024-08-20T14:23:11Z');
      const date2 = new Date('2024-08-19T14:23:11Z');

      expect(Utils.isBefore(date1, date2)).toBeFalse();
    });
  });

  describe('sortTransactions', () => {
    it('should sort transactions by latest date', () => {
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.latest))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.oldest))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.lowest))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.highest))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.aToZ))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, Sort.zToA))
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
      const transactions = TestUtils.getTransactions();

      expect(Utils.sortTransactions(transactions, 'unknown'))
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
    expect(Utils.filterTransactions(TestUtils.getTransactions(), 'General'))
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
});
