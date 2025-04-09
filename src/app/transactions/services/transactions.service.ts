import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Transaction} from '../models/transaction.model';
import {HttpService} from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private readonly httpService: HttpService = inject(HttpService);

  getAllTransactions(): Observable<Transaction[]> {
    return this.httpService.doGet<Transaction[]>('transactions');
  }
}
