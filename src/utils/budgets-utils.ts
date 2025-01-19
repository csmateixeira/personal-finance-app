import {Budget, BudgetSpending, Spending} from './models';

export class BudgetsUtils {
  static findSpendingForCategory(spendings: Spending[], category: string): Spending {
    return spendings.find((spending: Spending) => spending.category === category) ?? { amount: 0 } as Spending;
  }

  static getBudgetSpending(budget: Budget, spending: Spending): BudgetSpending {
    return {
      ...budget,
      spent: spending.amount,
      percent: spending.amount > 0 ? spending.amount / budget.maximum : 0,
      remaining: budget.maximum - spending.amount > 0 ? budget.maximum - spending.amount : 0
    }
  }
}
