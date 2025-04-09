import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {BudgetsSummaryComponent} from '../components/budgets-summary/budgets-summary.component';
import {BudgetsCardComponent} from '../components/budgets-card/budgets-card.component';
import {Observable} from 'rxjs';
import {selectBudgetsData} from '../state/budgets.state';
import {AsyncPipe} from '@angular/common';
import {BudgetDialogComponent} from '../components/budget-dialog/budget-dialog.component';

import {Budget} from '../models/budget.model';
import {BudgetAction} from '../../shared/models/action.model';
import {Page} from '../../shared/models/page.model';
import {BudgetsActions} from '../state/budgets.actions';

@Component({
  selector: 'app-budgets',
  imports: [
    BudgetsSummaryComponent,
    BudgetsCardComponent,
    AsyncPipe,
    BudgetDialogComponent
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})
export class BudgetsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);
  protected readonly BudgetAction = BudgetAction;

  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);

  showDialog: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(SidebarActions.changePage({page: Page.budgets}));
    this.store.dispatch(BudgetsActions.updateBudgetSpendings());
  }

  closeDialog() {
    this.showDialog = false;
  }

  addBudget() {
    this.closeDialog();
  }

  showAddDialog() {
    this.showDialog = true;
  }
}
