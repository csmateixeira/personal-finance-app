import {Injectable} from '@angular/core';
import {Budget} from '../utils/models';
import {Observable, of} from 'rxjs';
import {Data} from '../utils/data';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  getAllBudgets(): Observable<Budget[]> {
    return of(Data.getBudgets());
  }
}
