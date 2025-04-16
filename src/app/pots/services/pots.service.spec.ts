import {TestBed} from '@angular/core/testing';
import {PotsService} from './pots.service';
import {HttpService} from '../../shared/services/http.service';
import {of} from 'rxjs';
import {PotsTestsUtils} from '../../shared/utils/test-utils';
import {cold} from 'jasmine-marbles';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('PotsService', () => {
  let service: PotsService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PotsService,
        HttpService,
        HttpClient,
        HttpHandler
      ]
    });

    service = TestBed.inject(PotsService);
    httpService = TestBed.inject(HttpService);
  });

  it('should get all pots', () => {
    spyOn(httpService, 'doGet').and.returnValue(of(PotsTestsUtils.getPots()));

    expect(service.getAllPots()).toBeObservable(cold('(a|)', {
      a: PotsTestsUtils.getPots()
    }))
    expect(httpService.doGet).toHaveBeenCalledWith('pots');
  });

});
