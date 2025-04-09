import {TestBed} from '@angular/core/testing';
import {cold} from 'jasmine-marbles';
import {BudgetsService} from './budgets.service';
import {HttpService} from '../../shared/services/http.service';
import {of} from 'rxjs';
import {BudgetsTestsUtils} from '../../shared/utils/test-utils';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('BudgetsService', () => {
  let service: BudgetsService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        HttpClient,
        HttpHandler
      ]
    });

    service = TestBed.inject(BudgetsService);
    httpService = TestBed.inject(HttpService);
  });

  it('should return all budgets', () => {
    spyOn(httpService, 'doGet').and.returnValue(of(BudgetsTestsUtils.getBudgets()));

    expect(service.getAllBudgets()).toBeObservable(cold('(a|)', {
      a: BudgetsTestsUtils.getBudgets()
    }));
  });
});
