import {Budget, Theme, Spending} from '../models/features.models';
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
}
