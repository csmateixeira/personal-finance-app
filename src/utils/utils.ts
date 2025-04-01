import {Colors, Option} from '../models/models';
import {Theme, Transaction} from '../models/features.models';

export class Utils {
  static getUniqueValues(values: string[]): string[] {
    return values
      .filter((category: string, index: number) => values.indexOf(category) === index);
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

  static isNullOrEmpty(value?: string | null): boolean {
    return value === undefined || value === null || value === '';
  }

  static roundNumber(value: number, dec = 2): number {
    return Math.round(value * Math.pow(10, dec)) / Math.pow(10, dec);
  }

  static getTotals(data: number[]): number {
    return data.reduce((accumulator: number, current: number) => accumulator + current, 0);
  }

  static findOptionByValue(options: Option[], value: string): Option {
    return options.find((option: Option) => option.value === value)!;
  }

  static findOptionById(options: Option[], id: number): Option {
    return options.find((option: Option) => option.id === id)!;
  }

  static initializeThemes(): Theme[] {
    return [
      {id: 1, name: 'Green', color: Colors.green, isUsed: false},
      {id: 2, name: 'Yellow', color: Colors.yellow, isUsed: false},
      {id: 3, name: 'Cyan', color: Colors.cyan, isUsed: false},
      {id: 4, name: 'Navy', color: Colors.navy, isUsed: false},
      {id: 5, name: 'Red', color: Colors.red, isUsed: false},
      {id: 6, name: 'Purple', color: Colors.purple, isUsed: false},
      {id: 7, name: 'Turquoise', color: Colors.turquoise, isUsed: false},
      {id: 8, name: 'Brown', color: Colors.brown, isUsed: false},
      {id: 9, name: 'Magenta', color: Colors.magenta, isUsed: false},
      {id: 10, name: 'Blue', color: Colors.blue, isUsed: false},
      {id: 11, name: 'Navy Grey', color: Colors.grey, isUsed: false},
      {id: 12, name: 'Army Green', color: Colors.army, isUsed: false},
      {id: 13, name: 'Pink', color: Colors.pink, isUsed: false},
      {id: 14, name: 'Gold', color: Colors.gold, isUsed: false},
      {id: 15, name: 'Orange', color: Colors.orange, isUsed: false},
    ];
  }

  static calculateExpenses(transactions: Transaction[]): number {
    return transactions
      .filter((transaction: Transaction): boolean => transaction.amount < 0)
      .reduce((total: number, transaction: Transaction): number => total + Math.abs(transaction.amount), 0);
  }

  static calculateIncome(transactions: Transaction[]): number {
    return transactions
      .filter((transaction: Transaction): boolean => transaction.amount > 0)
      .reduce((total: number, transaction: Transaction): number => total + transaction.amount, 0);
  }
}
