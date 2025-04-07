import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../../shared/utils/data';

import {Balance} from "../models/balance.model";

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  getAllBalances(): Observable<Balance> {
    return of(Data.getBalance());
  }
}
