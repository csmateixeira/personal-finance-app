import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {createMockStore, MockStore, provideMockStore} from '@ngrx/store/testing';
import {BudgetsEffects} from './budgets.effects';
import {BudgetsService} from '../services/budgets.service';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {BudgetsTestsUtils, TransactionsTestUtils} from '../../shared/utils/test-utils';
import {cold, hot} from 'jasmine-marbles';
import {BudgetsActions} from './budgets.actions';
import {TransactionsUtils} from '../../transactions/transactions.utils';
import {selectTransactionsData} from '../../transactions/state/transactions.state';
import {selectBudgetsData, selectBudgetsThemes} from './budgets.state';
import {Spending} from "../models/spending.model";
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Budget} from '../models/budget.model';
import {Colors} from '../../shared/models/colors.model';

describe('BudgetsEffects', () => {
  let actions$: Observable<Action>;
  let effects: BudgetsEffects;
  let service: BudgetsService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        HttpClient,
        HttpHandler
      ],
    });

    effects = TestBed.inject(BudgetsEffects);
    service = TestBed.inject(BudgetsService);

    spyOn(service, 'getAllBudgets').and.returnValue(of(BudgetsTestsUtils.getBudgets()));
  });

  describe('loadBudgets$', () => {
    it('should return success action to load all budgets', () => {
      actions$ = hot('a', {
        a: BudgetsActions.loadBudgets()
      });

      const result = effects.loadBudgets$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: BudgetsActions.budgetsLoaded.type,
          budgets: BudgetsTestsUtils.getBudgets()
        }
      }));
      expect(service.getAllBudgets).toHaveBeenCalled();
    })
  });

  describe('updateBudgetSpendings$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: {},
        selectors: [
          {
            selector: selectTransactionsData, value: TransactionsTestUtils.getTransactions()
          },
          {
            selector: selectBudgetsData, value: BudgetsTestsUtils.getBudgets()
          }
        ]
      });
    });

    it('should return success action to update budget spendings', () => {
      actions$ = hot('a', {
        a: BudgetsActions.updateBudgetSpendings()
      });

      const expectedSpendings: Spending[] = [
        {
          category: BudgetsTestsUtils.getBudgets()[0].category,
          amount: 20
        },
        {
          category: BudgetsTestsUtils.getBudgets()[1].category,
          amount: 200
        }
      ];

      spyOn(TransactionsUtils, 'getSpendingsForMonth').and.returnValue(expectedSpendings);

      const expected = cold('a', {
        a: {
          type: BudgetsActions.budgetSpendingsUpdated.type,
          budgets: [
            {
              ...BudgetsTestsUtils.getBudgets()[0],
              spent: 20,
              percent: 0.4,
              remaining: 30
            },
            {
              ...BudgetsTestsUtils.getBudgets()[1],
              spent: 200,
              percent: 0.27,
              remaining: 550
            }
          ]
        }
      });

      expect(effects.updateBudgetSpendings$).toBeObservable(expected);
    });

    it('should return success action to update budget spendings when budget is added', () => {
      const newBudget: Budget = {
        "category": "Entertainment",
        "maximum": 100.00,
        "theme": "#BE6C49"
      };

      actions$ = hot('a', {
        a: BudgetsActions.budgetAdded({newBudget})
      });

      const expectedSpendings: Spending[] = [
        {
          category: BudgetsTestsUtils.getBudgets()[0].category,
          amount: 20
        },
        {
          category: BudgetsTestsUtils.getBudgets()[1].category,
          amount: 200
        }
      ];

      spyOn(TransactionsUtils, 'getSpendingsForMonth').and.returnValue(expectedSpendings);

      const expected = cold('a', {
        a: {
          type: BudgetsActions.budgetSpendingsUpdated.type,
          budgets: [
            {
              ...BudgetsTestsUtils.getBudgets()[0],
              spent: 20,
              percent: 0.4,
              remaining: 30
            },
            {
              ...BudgetsTestsUtils.getBudgets()[1],
              spent: 200,
              percent: 0.27,
              remaining: 550
            }
          ]
        }
      });

      expect(effects.updateBudgetSpendings$).toBeObservable(expected);
    });
  });

  describe('addBudget$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: {},
        selectors: [
          {
            selector: selectBudgetsThemes, value: BudgetsTestsUtils.getBudgetsThemes()
          }
        ]
      });
    });

    it('should call service to add the budget and dispatch added action', () => {
      const newBudget: Budget = {
        "category": "Entertainment",
        "maximum": 100.00,
        "theme": "Green"
      };

      spyOn(service, 'addBudget').and.returnValue(of({
        ...newBudget,
        theme: Colors.green
      }));

      actions$ = hot('a', {
        a: BudgetsActions.addBudget({newBudget})
      });

      const expected = cold('a', {
        a: {
          type: BudgetsActions.budgetAdded.type,
          newBudget: {
            ...newBudget,
            theme: Colors.green
          }
        }
      });

      expect(effects.addBudget$).toBeObservable(expected);
      expect(service.addBudget).toHaveBeenCalledWith({
        ...newBudget,
        theme: Colors.green
      });
    });
  });

  describe('editBudget$', () => {
    beforeEach(() => {
      store = createMockStore({
        initialState: {},
        selectors: [
          {
            selector: selectBudgetsData, value: BudgetsTestsUtils.getBudgets()
          }
        ]
      });
    });

    it('should call service to edit the budget and dispatch edited action', () => {
      const newBudget: Budget = {
        "category": "General",
        "maximum": 100.00,
      } as Budget;
      const changedBudget: Budget = {
        ...BudgetsTestsUtils.getBudgets()[0],
        maximum: 100,
      };

      spyOn(service, 'updateBudget').and.returnValue(of(changedBudget));

      actions$ = hot('a', {
        a: BudgetsActions.editBudget({newBudget})
      });

      const expected = cold('a', {
        a: {
          type: BudgetsActions.budgetEdited.type,
          newBudget: changedBudget
        }
      });

      expect(effects.editBudget$).toBeObservable(expected);
      expect(service.updateBudget).toHaveBeenCalledWith(changedBudget);
    });
  });
});
