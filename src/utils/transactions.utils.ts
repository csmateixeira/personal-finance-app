import {Sort} from '../models/models';
import {Utils} from './utils';
import {Spending, Transaction} from '../models/features.models';

export class TransactionsUtils {
  static getPageData<T>(data: T[], page: number): T[] {
    const start = (page - 1) * 10;
    const end = start + 10;

    return data.slice(start, end);
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

  static searchTransactions(transactions: Transaction[], search: string, category?: string): Transaction[] {
    const filteredByCategory: Transaction[] = category ?
      this.filterTransactions(transactions, category)
      : transactions;

    return Utils.isNullOrEmpty(search) ?
      filteredByCategory
      : filteredByCategory.filter((t: Transaction) => t.name.toLowerCase().includes(search.toLowerCase()));
  }

  static getSpendingsForMonth(transactions: Transaction[], categories: string[], currentMonth: number): Spending[] {
    return categories.map((category: string) => {
      const amount: number = transactions
        .filter((t: Transaction) => new Date(t.date).getMonth() === currentMonth)
        .filter((t: Transaction) => t.category === category)
        .filter((t: Transaction) => t.amount < 0)
        .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

      return {category, amount: Math.abs(amount)};
    });
  }
}
