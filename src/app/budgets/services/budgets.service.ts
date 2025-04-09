import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Budget} from "../models/budget.model";
import {HttpService} from "../../shared/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private readonly httpService: HttpService = inject(HttpService);

  getAllBudgets(): Observable<Budget[]> {
    return this.httpService.doGet<Budget[]>('budgets');
  }
}
