import {Option} from '../models/models';

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

  static roundNumber(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static getTotals(data: number[]): number {
    return data.reduce((accumulator: number, current: number) => accumulator + current, 0);
  }
}
