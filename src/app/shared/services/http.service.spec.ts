import {TestBed} from '@angular/core/testing';
import {HttpService} from './http.service';
import {EMPTY, of} from 'rxjs';
import {cold} from 'jasmine-marbles';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ApiResponse} from '../models/api-response.model';

describe('HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService, HttpClient, HttpHandler],
    });

    service = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should call doGet and return data', () => {
    const uri = 'test-uri';
    const expectedResponse: ApiResponse<string> = {
      status: 200,
      data: 'test-data'
    };

    spyOn(httpClient, 'get').and.returnValue(of(expectedResponse));

    expect(service.doGet(uri)).toBeObservable(cold('(a|)', {
      a: expectedResponse.data
    }));
  });

  it('should handle error in doGet', () => {
    const uri = 'test-uri';
    const errorResponse = { message: 'error' };

    spyOn(httpClient, 'get').and.returnValue(cold('#', {}, errorResponse));

    expect(service.doGet(uri)).toBeObservable(cold('|'))
  });
});
