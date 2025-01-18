import {TestBed} from '@angular/core/testing';
import {cold} from 'jasmine-marbles';
import {Data} from '../utils/data';
import {BudgetsService} from './budgets.service';

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
});
