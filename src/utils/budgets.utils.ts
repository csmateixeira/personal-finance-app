import {Budget, BudgetsTheme, Spending} from '../models/features.models';
import {Colors} from '../models/models';

export class BudgetsUtils {
  static findSpendingForCategory(spendings: Spending[], category: string): Spending {
    return spendings.find((spending: Spending) => spending.category === category) ?? {amount: 0} as Spending;
  }

  static getBudgetSpending(budget: Budget, spending: Spending): Budget {
    return {
      ...budget,
      spent: spending.amount,
      percent: spending.amount > 0 ? spending.amount / budget.maximum : 0,
      remaining: budget.maximum - spending.amount > 0 ? budget.maximum - spending.amount : 0
    }
  }

  static getMaximumTotals(budgets: Budget[]): number {
    return budgets.reduce((accumulator: number, current: Budget) => accumulator + current.maximum, 0);
  }

  static findBudgetByCategory(budgets: Budget[], category: string): Budget {
    return budgets.find((budget: Budget) => budget.category === category)!;
  }

  static initializeBudgetThemes(): BudgetsTheme[] {
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
}
