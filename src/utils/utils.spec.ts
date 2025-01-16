import {Utils} from './utils';

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
});
