import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Transaction} from '../models/features.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  getAllTransactions(): Observable<Transaction[]> {
    return of(Data.getTransactions());
  }
}
