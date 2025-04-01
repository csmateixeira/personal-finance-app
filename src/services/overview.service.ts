import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Balance} from '../models/features.models';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  getAllBalances(): Observable<Balance> {
    return of(Data.getBalance());
  }
}
