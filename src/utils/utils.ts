import {Option, Sort, Transaction} from './models';

export class Utils {
  static getPageData<T>(data: T[], page: number): T[] {
    const start = (page - 1) * 10;
    const end = start + 10;

    return data.slice(start, end);
  }

  static getUniqueOptions(data: string[]): Option[] {
    return data.reduce((accumulator: Option[], current: string, index: number) => {
      if (accumulator.find((option: Option) => option.value === current)) {
        return accumulator;
      }

      return [
        ...accumulator,
        {id: index + 1, value: current}
      ];
    }, []);
  }

  static isBefore(date1: Date, date2: Date): boolean {
    return date1 <= date2;
  }

  static sortTransactions(transactions: Transaction[], sort: string): Transaction[] {
    return transactions.sort((a: Transaction, b: Transaction) => {
      switch (sort) {
        case Sort.latest:
          return Utils.isBefore(new Date(a.date), new Date(b.date)) ? 1 : -1;
        case Sort.oldest:
          return Utils.isBefore(new Date(b.date), new Date(a.date)) ? 1 : -1;
        case Sort.lowest:
          return Math.abs(a.amount) - Math.abs(b.amount);
        case Sort.highest:
          return Math.abs(b.amount) - Math.abs(a.amount);
        case Sort.aToZ:
          return a.name.localeCompare(b.name);
        case Sort.zToA:
          return b.name.localeCompare(a.name);
        default:
          return Utils.isBefore(new Date(a.date), new Date(b.date)) ? 1 : -1;
      }
    })
  }

  static filterTransactions(transactions: Transaction[], category: string): Transaction[] {
    return transactions.filter((t: Transaction) => t.category === category)
  }
}
