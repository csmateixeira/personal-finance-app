import {Utils} from '../shared/utils/utils';
import {Budget} from "./models/budget.model";
import {Option} from '../shared/models/option.model';
import {BudgetAction} from '../shared/models/action.model';

export class BudgetDialogUtils {
  static filterCategories(categories: Option[], budgets: Budget[], action: BudgetAction): Option[] {
    return action === BudgetAction.edit ? categories :
      categories.filter((category: Option) => category.id !== -1)
        .filter((category: Option) => !budgets.some(budget => budget.category === category.value))
  }

  static getSelectedTheme(action: BudgetAction, themes: Option[], selectedBudget: Budget): number {
    return action === BudgetAction.edit ?
      themes.find((theme: Option) => theme.prefix === selectedBudget.theme)!.id : themes[0].id
  }

  static getSelectedCategory(action: BudgetAction, categories: Option[], category: string): number {
    return action === BudgetAction.edit ? Utils.findOptionByValue(categories, category).id : categories[0].id
  }
}
