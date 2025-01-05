import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from '../utils/models';
import {Data} from '../utils/data';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  getAllTransactions(): Observable<Transaction[]> {
    return of(Data.getTransactions());
  }
}
