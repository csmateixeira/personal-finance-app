import {TestBed} from '@angular/core/testing';
import {cold} from 'jasmine-marbles';
import {Data} from '../utils/data';
import {BudgetsService} from './budgets.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BudgetsUtils} from '../utils/budgets.utils';
import {BudgetsTestsUtils, TransactionsTestUtils} from '../utils/test-utils';
import {Budget, Theme} from '../models/features.models';
import {ModalAction, Option} from '../models/models';
import {of} from 'rxjs';
import {BudgetDialogUtils} from '../app/components/budgets/budget-dialog/budget-dialog.utils';

describe('BudgetsService', () => {
  let service: BudgetsService;
  let store: MockStore;

  let budgets: Budget[] = BudgetsTestsUtils.getBudgets();
  let themes: Theme[] = BudgetsTestsUtils.getBudgetsThemes();
  let categories: Option[] = TransactionsTestUtils.getTransactionsCategoryOptions();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });

    service = TestBed.inject(BudgetsService);
    store = TestBed.inject(MockStore);

    store.setState({
      budgets: BudgetsTestsUtils.getBudgetsStateForEffects(),
      transactions: TransactionsTestUtils.getTransactionsStateForEffects()
    });

    spyOn(store, 'dispatch');
  });

  it('should initialize observables', () => {
    expect(service.budgets$).toBeObservable(cold('a', {
      a: budgets
    }));
    expect(service.themes$).toBeObservable(cold('a', {
      a: themes
    }));
    expect(service.categories$).toBeObservable(cold('a', {
      a: categories
    }));
  });

  it('should return all transactions', () => {
    const expected = cold('(a|)', {
      a: Data.getBudgets()
    })

    expect(service.getAllBudgets()).toBeObservable(expected);
  });

  it('should return selected budget from store', () => {
    spyOn(BudgetsUtils, 'findBudgetByCategory').and.returnValue(budgets[0]);

    expect(service.getSelectedBudgetFromStore('Groceries')).toBeObservable(cold('a', {
      a: budgets[0]
    }));
    expect(BudgetsUtils.findBudgetByCategory).toHaveBeenCalledWith(budgets, 'Groceries');
  });

  it('should return themes as options from store', () => {
    expect(service.getThemesAsOptionsFromStore()).toBeObservable(cold('a', {
      a: BudgetsTestsUtils.getBudgetsThemeOptions()
    }));
  });

  it('should return selected themes from store', () => {
    spyOn(service, 'getThemesAsOptionsFromStore').and.returnValue(of(BudgetsTestsUtils.getBudgetsThemeOptions()));
    spyOn(service, 'getSelectedBudgetFromStore').and.returnValue(of(budgets[0]));
    spyOn(BudgetDialogUtils, 'getSelectedTheme').and.returnValue(1);

    expect(service.getSelectedThemesFromStore('Groceries', 0)).toBeObservable(cold('(a|)', {
      a: 1
    }));
    expect(service.getThemesAsOptionsFromStore).toHaveBeenCalled();
    expect(service.getSelectedBudgetFromStore).toHaveBeenCalledWith('Groceries');
    expect(BudgetDialogUtils.getSelectedTheme)
      .toHaveBeenCalledWith(ModalAction.add, BudgetsTestsUtils.getBudgetsThemeOptions(), budgets[0]);
  });

  it('should return selected category from store', () => {
    spyOn(BudgetDialogUtils, 'getSelectedCategory').and.returnValue(1);

    expect(service.getSelectedCategoryFromStore('Groceries', 0)).toBeObservable(cold('a', {
      a: 1
    }));
    expect(BudgetDialogUtils.getSelectedCategory)
      .toHaveBeenCalledWith(ModalAction.add, categories, 'Groceries');
  });

  it('should return filtered categories from store', () => {
    spyOn(BudgetDialogUtils, 'filterCategories').and.returnValue(categories);

    expect(service.getFilteredCategoriesFromStore(0)).toBeObservable(cold('a', {
      a: categories
    }));
    expect(BudgetDialogUtils.filterCategories)
      .toHaveBeenCalledWith(categories, budgets, ModalAction.add);
  });

  it('should find category value by id from store', () => {
    expect(service.findCategoryValueByIdFromStore(1)).toBeObservable(cold('a', {
      a: 'General'
    }));
  });

  it('should send add action', () => {
    service.sendAddAction('Groceries', 100, '#F2CDAC');

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Budgets] Add Budget',
      newBudget: {
        id: jasmine.any(String),
        category: 'Groceries',
        maximum: 100,
        theme: '#F2CDAC'
      }
    });
  });

  it('should send edit action', () => {
    service.sendEditAction('Groceries', 100, '#F2CDAC');

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Budgets] Edit Budget',
      newBudget: {
        category: 'Groceries',
        maximum: 100,
        theme: '#F2CDAC'
      }
    });
  });

  it('should send delete action', () => {
    service.sendDeleteAction('Groceries');

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Budgets] Delete Budget',
      category: 'Groceries'
    });
  });
});
