import {Utils} from './utils';
import {Option} from '../models/option.model';
import {DialogAction} from '../models/dialog-action.model';
import {ThemedItem} from '../models/themed-item';
import {CategorisedItem} from '../models/categorised-item';

export class DialogUtils {
  static filterCategories(categories: Option[], items: CategorisedItem[], action: DialogAction): Option[] {
    return action === DialogAction.edit ? categories :
      categories.filter((category: Option) => category.id !== -1)
        .filter((category: Option) => !items.some((item: CategorisedItem) => item.category === category.value))
  }

  static getSelectedTheme(action: DialogAction, themes: Option[], selected: ThemedItem): number {
    return action === DialogAction.edit ?
      themes.find((theme: Option) => theme.prefix === selected.theme)!.id : themes[0].id
  }

  static getSelectedCategory(action: DialogAction, categories: Option[], category: string): number {
    return action === DialogAction.edit ? Utils.findOptionByValue(categories, category).id : categories[0].id
  }
}
