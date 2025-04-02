import {ModalAction, Option} from '../../../../models/models';
import {Budget} from '../../../../models/features.models';
import {Utils} from '../../../../utils/utils';

export class BudgetDialogUtils {
  static filterCategories(categories: Option[], budgets: Budget[], action: ModalAction): Option[] {
    return action === ModalAction.edit ? categories :
      categories.filter((category: Option) => category.id !== -1)
        .filter((category: Option) => !budgets.some(budget => budget.category === category.value))
  }

  static getSelectedTheme(action: ModalAction, themes: Option[], selectedBudget: Budget): number {
    return action === ModalAction.edit ?
      themes.find((theme: Option) => theme.prefix === selectedBudget.theme)!.id : themes[0].id
  }

  static getSelectedCategory(action: ModalAction, categories: Option[], category: string): number {
    return action === ModalAction.edit ? Utils.findOptionByValue(categories, category).id : categories[0].id
  }
}
