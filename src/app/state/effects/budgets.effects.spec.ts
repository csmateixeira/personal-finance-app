import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {createMockStore, MockStore, provideMockStore} from '@ngrx/store/testing';
import {BudgetsEffects} from './budgets.effects';
import {BudgetsService} from '../../../services/budgets.service';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {BudgetsTestsUtils, TransactionsTestUtils} from '../../../utils/test-utils';
import {cold, hot} from 'jasmine-marbles';
import {BudgetsActions} from '../actions/budgets.actions';
import {TransactionsActions} from '../actions/transactions.actions';
import {TransactionsUtils} from '../../../utils/transactions.utils';
import {Spending} from '../../../models/features.models';
import {selectTransactionsData} from '../transactions.state';
import {selectBudgetsData} from '../budgets.state';

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
        provideMockStore()
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
        a: TransactionsActions.transactionsLoaded({transactions: TransactionsTestUtils.getTransactions()})
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
});
