import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../../shared/utils/data';

import {Transaction} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  getAllTransactions(): Observable<Transaction[]> {
    return of(Data.getTransactions());
  }
}
