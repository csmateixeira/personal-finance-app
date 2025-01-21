import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Budget} from '../models/features.models';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  getAllBudgets(): Observable<Budget[]> {
    return of(Data.getBudgets());
  }
}
