import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';
import {cold} from 'jasmine-marbles';
import {Data} from '../utils/data';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsService);
  });

  it('should return all transactions', () => {
    const expected = cold('(a|)', {
      a: Data.getTransactions()
    })

    expect(service.getAllTransactions()).toBeObservable(expected);
  });
});
