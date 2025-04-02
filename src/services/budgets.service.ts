import {inject, Injectable} from '@angular/core';
import {combineLatest, map, Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Budget, Theme} from '../models/features.models';
import {selectBudgetsData, selectBudgetsThemes} from '../app/state/budgets.state';
import {Store} from '@ngrx/store';
import {BudgetsUtils} from '../utils/budgets.utils';
import {ModalAction, Option} from '../models/models';
import {BudgetDialogUtils} from '../app/components/budgets/budget-dialog/budget-dialog.utils';
import {selectTransactionsCategories} from '../app/state/transactions.state';
import {BudgetsActions} from '../app/state/actions/budgets.actions';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private store: Store = inject(Store);

  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);
  themes$: Observable<Theme[]> = this.store.select(selectBudgetsThemes);
  categories$: Observable<Option[]> = this.store.select(selectTransactionsCategories);

  getAllBudgets(): Observable<Budget[]> {
    return of(Data.getBudgets());
  }

  getSelectedBudgetFromStore(category: string): Observable<Budget> {
    return this.budgets$.pipe(
      map((budgets: Budget[]): Budget => BudgetsUtils.findBudgetByCategory(budgets, category)),
    );
  }

  getThemesAsOptionsFromStore(): Observable<Option[]> {
    return this.themes$.pipe(
      map((themes: Theme[]): Option[] => themes.map((theme: Theme) => ({
        id: theme.id,
        value: theme.name,
        prefix: theme.color,
        postfix: theme.isUsed ? 'Already used' : ''
      })))
    );
  }

  getSelectedThemesFromStore(category: string, action: ModalAction): Observable<number> {
    const options$: Observable<Option[]> = this.getThemesAsOptionsFromStore();
    const selected$: Observable<Budget> = this.getSelectedBudgetFromStore(category);

    return combineLatest([options$, selected$]).pipe(
      map(([themes, selectedBudget]: [Option[], Budget]): number => BudgetDialogUtils.getSelectedTheme(action, themes, selectedBudget))
    );
  }

  getSelectedCategoryFromStore(category: string, action: ModalAction): Observable<number> {
    return this.categories$.pipe(
      map((categories: Option[]): number => BudgetDialogUtils.getSelectedCategory(action, categories, category))
    );
  }

  getFilteredCategoriesFromStore(action: ModalAction): Observable<Option[]> {
    return combineLatest([this.categories$, this.budgets$]).pipe(
      map(([categories, budgets]): Option[] => BudgetDialogUtils.filterCategories(categories, budgets, action))
    );
  }

  findCategoryValueByIdFromStore(id: number): Observable<string> {
    return this.categories$.pipe(
      map((categories: Option[]) => categories.find((category: Option) => category.id === id)!.value)
    );
  }

  sendAddAction(category: string, maximum: number, theme: string) {
    this.store.dispatch(BudgetsActions.addBudget({
      newBudget: {
        id: uuidv4(),
        category,
        maximum,
        theme
      }
    }));
  }

  sendEditAction(category: string, maximum: number, theme: string) {
    this.store.dispatch(BudgetsActions.editBudget({
      newBudget: {
        category,
        maximum,
        theme
      }
    }));
  }

  sendDeleteAction(category: string) {
    this.store.dispatch(BudgetsActions.deleteBudget({category}));
  }
}
