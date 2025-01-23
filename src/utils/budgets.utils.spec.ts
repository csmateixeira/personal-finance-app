import {BudgetsUtils} from './budgets.utils';
import {Budget, Spending} from '../models/features.models';
import {Colors} from '../models/models';

describe('BudgetsUtils', () => {
  describe('findSpendingForCategory', () => {
    it('should find spending for a category', () => {
      const spendings: Spending[] = [
        {category: 'Food', amount: 100},
        {category: 'Entertainment', amount: 200}
      ];
      const category = 'Entertainment';
      expect(BudgetsUtils.findSpendingForCategory(spendings, category))
        .toEqual({category: 'Entertainment', amount: 200});
    });

    it('should return default amount if spending is not found for category', () => {
      const spendings: Spending[] = [
        {category: 'Food', amount: 100},
        {category: 'Entertainment', amount: 200}
      ];
      const category = 'Transportation';
      expect(BudgetsUtils.findSpendingForCategory(spendings, category))
        .toEqual({amount: 0} as Spending);
    });
  });

  it('should get budget spending', () => {
    const budget: Budget = {
      id: '123',
      category: 'Food',
      maximum: 1000,
      theme: Colors.red
    };
    const spending: Spending = {
      category: 'Food',
      amount: 500
    };

    expect(BudgetsUtils.getBudgetSpending(budget, spending))
      .toEqual({
        id: '123',
        category: 'Food',
        maximum: 1000,
        theme: Colors.red,
        spent: 500,
        percent: 0.5,
        remaining: 500
      });
  });

  it('should get maximum totals', () => {
    const budgets: Budget[] = [
      {
        id: '1',
        category: 'Food',
        maximum: 1000,
        theme: Colors.red
      },
      {
        id: '2',
        category: 'Entertainment',
        maximum: 2000,
        theme: Colors.blue
      }
    ];

    expect(BudgetsUtils.getMaximumTotals(budgets)).toEqual(3000);
  });

  describe('findBudgetByCategory', () => {
    it('should find budget by category', () => {
      const budgets: Budget[] = [
        {id: '1', category: 'Food', maximum: 1000, theme: Colors.red},
        {id: '2', category: 'Entertainment', maximum: 2000, theme: Colors.blue}
      ];
      const category = 'Food';
      expect(BudgetsUtils.findBudgetByCategory(budgets, category))
        .toEqual({id: '1', category: 'Food', maximum: 1000, theme: Colors.red});
    });
  });
});
