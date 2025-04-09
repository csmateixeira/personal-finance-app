import {TestBed} from '@angular/core/testing';

import {TransactionsService} from './transactions.service';
import {cold} from 'jasmine-marbles';
import {HttpService} from '../../shared/services/http.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {of} from 'rxjs';
import {TransactionsTestUtils} from '../../shared/utils/test-utils';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        HttpClient,
        HttpHandler
      ]
    });

    service = TestBed.inject(TransactionsService);
    httpService = TestBed.inject(HttpService);
  });

  it('should return all transactions', () => {
    spyOn(httpService, 'doGet').and.returnValue(of(TransactionsTestUtils.getTransactions()));

    const expected = cold('(a|)', {
      a: TransactionsTestUtils.getTransactions()
    })

    expect(service.getAllTransactions()).toBeObservable(expected);
  });
});
