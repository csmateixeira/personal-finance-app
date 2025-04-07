import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../../shared/utils/data';

import {Budget} from "../models/budget.model";

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  getAllBudgets(): Observable<Budget[]> {
    return of(Data.getBudgets());
  }
}
