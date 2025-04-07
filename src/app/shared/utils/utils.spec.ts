import {Utils} from './utils';
import {TransactionsTestUtils} from './test-utils';
import {Option} from '../models/option.model';
import {Transaction} from '../../transactions/models/transaction.model';

describe('Utils', () => {
  it('should get unique values from a list', () => {
    expect(Utils.getUniqueValues(['a', 'b', 'a', 'c']))
      .toEqual(['a', 'b', 'c']);
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

  describe('isNullOrEmpty', () => {
    it('should return true if string is undefined', () => {
      expect(Utils.isNullOrEmpty(undefined)).toBeTrue();
    });

    it('should return true if string is empty', () => {
      expect(Utils.isNullOrEmpty('')).toBeTrue();
    });

    it('should return true if string is null', () => {
      expect(Utils.isNullOrEmpty(null)).toBeTrue();
    });

    it('should return false if string is not undefined, not null and not empty', () => {
      expect(Utils.isNullOrEmpty('test')).toBeFalse();
    });
  });

  it('should round the number to 2 decimal places', () => {
    expect(Utils.roundNumber(7.71000004)).toEqual(7.71)
  });

  it('should get totals', () => {
    const data: number[] = [1, 2, 3, 4, 5];

    expect(Utils.getTotals(data)).toEqual(15);
  });

  describe('findOptionByValue', () => {
    it('should return the option with the matching value', () => {
      const options: Option[] = [
        {id: 1, value: 'Option1'},
        {id: 2, value: 'Option2'},
        {id: 3, value: 'Option3'}
      ];
      const value = 'Option2';

      const result = Utils.findOptionByValue(options, value);

      expect(result).toEqual({id: 2, value: 'Option2'});
    });

    describe('findOptionById', () => {
      it('should return the option with the matching id', () => {
        const options: Option[] = [
          {id: 1, value: 'Option1'},
          {id: 2, value: 'Option2'},
          {id: 3, value: 'Option3'}
        ];
        const id = 2;

        const result = Utils.findOptionById(options, id);

        expect(result).toEqual({id: 2, value: 'Option2'});
      });
    });
  });

  it('should calculate expenses', () => {
    const transactions: Transaction[] = [
      ...TransactionsTestUtils.getTransactions(),
      {
        id: '987',
        "avatar": "avatars/emma-richardson.jpg",
        "name": "Emma Richardson",
        "category": "General",
        "date": "2024-08-19T14:23:11Z",
        "amount": 15.00,
        "recurring": false
      }
    ];

    expect(Utils.calculateExpenses(transactions)).toEqual(97.80);
  });

  it('should calculate income', () => {
    const transactions: Transaction[] = [
      ...TransactionsTestUtils.getTransactions(),
      {
        id: '987',
        "avatar": "avatars/emma-richardson.jpg",
        "name": "Emma Richardson",
        "category": "General",
        "date": "2024-08-19T14:23:11Z",
        "amount": 15.00,
        "recurring": false
      }
    ];

    expect(Utils.calculateIncome(transactions)).toEqual(90.50);
  });
});
