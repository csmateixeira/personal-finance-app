import {TestBed} from '@angular/core/testing';
import {HttpService} from './http.service';
import {of} from 'rxjs';
import {cold} from 'jasmine-marbles';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ApiResponse} from '../models/api-response.model';
import {environment} from '../../../environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;

  const apiUrl = environment.baseApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService, HttpClient, HttpHandler],
    });

    service = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('doGet', () => {
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
      expect(httpClient.get).toHaveBeenCalledWith(apiUrl + '/test-uri');
    });

    it('should handle error in doGet', () => {
      const uri = 'test-uri';
      const errorResponse = { message: 'error' };

      spyOn(httpClient, 'get').and.returnValue(cold('#', {}, errorResponse));

      expect(service.doGet(uri)).toBeObservable(cold('|'))
      expect(httpClient.get).toHaveBeenCalledWith(apiUrl + '/test-uri');
    });
  });

  describe('doPost', () => {
    it('should call doPost and return data', () => {
      const uri = 'test-uri';
      const body = { test: 'data' };
      const expectedResponse: ApiResponse<string> = {
        status: 200,
        data: 'test-data'
      };

      spyOn(httpClient, 'post').and.returnValue(of(expectedResponse));

      expect(service.doPost(uri, body)).toBeObservable(cold('(a|)', {
        a: expectedResponse.data
      }));
      expect(httpClient.post).toHaveBeenCalledWith(apiUrl + '/test-uri', body);
    });

    it('should handle error in doPost', () => {
      const uri = 'test-uri';
      const body = { test: 'data' };
      const errorResponse = { message: 'error' };

      spyOn(httpClient, 'post').and.returnValue(cold('#', {}, errorResponse));

      expect(service.doPost(uri, body)).toBeObservable(cold('|'))
      expect(httpClient.post).toHaveBeenCalledWith(apiUrl + '/test-uri', body);
    });
  });

});
