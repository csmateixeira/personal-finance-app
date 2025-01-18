import {TestBed} from '@angular/core/testing';
import {cold} from 'jasmine-marbles';
import {Data} from '../utils/data';
import {BudgetsService} from './budgets.service';
import {Observable} from 'rxjs';
import {Budget, Spending, Transaction} from '../utils/models';
import {BudgetsTestsUtils, TransactionsTestUtils} from '../utils/test-utils';

describe('BudgetsService', () => {
  let service: BudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetsService);
  });

  it('should return all transactions', () => {
    const expected = cold('(a|)', {
      a: Data.getBudgets()
    })

    expect(service.getAllBudgets()).toBeObservable(expected);
  });

  it('should get spending for given budget', () => {
    const spending$: Observable<Spending[]> = cold('a', {
      a: TransactionsTestUtils.getSpendings()
    });
    const budget: Budget = BudgetsTestsUtils.getBudgets()[0];

    expect(service.getBudgetSpending(spending$, budget))
      .toBeObservable(cold('a', {
        a: BudgetsTestsUtils.getBudgetSpending()
      }));
  });

  it('should get the 3 most recent transactions', () => {
    const transactionsArray: Transaction[] = [
      ...TransactionsTestUtils.getTransactions(),
      {
        id: '267',
        "avatar": "avatars/emma-richardson.jpg",
        "name": "Emma Richardson",
        "category": "General",
        "date": "2024-08-19T14:23:11Z",
        "amount": 75.50,
        "recurring": false
      },
    ];
    const transactions$: Observable<Transaction[]> = cold('a', {
      a: transactionsArray
    });
    const category: string = 'General';

    expect(service.getLatestTransactions(transactions$, category))
      .toBeObservable(cold('a', {
        a: [transactionsArray[0], transactionsArray[1], transactionsArray[3]]
      }))
  });
});
