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

    addBudget(budget: Budget): Observable<Budget> {
        return this.httpService.doPost<Budget>('budgets', budget);
    }

    updateBudget(budget: Budget): Observable<Budget> {
        return this.httpService.doPut<Budget>(`budgets/${budget.id}`, budget);
    }

    deleteBudget(id: string): Observable<boolean> {
        return this.httpService.doDelete(`budgets/${id}`);
    }
}
