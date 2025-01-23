import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../state/sidebar.state';
import {SidebarActions} from '../../state/actions/sidebar.actions';
import {BudgetAction, Page} from '../../../models/models';
import {BudgetsSummaryComponent} from '../../components/budgets/budgets-summary/budgets-summary.component';
import {BudgetsCardComponent} from '../../components/budgets/budgets-card/budgets-card.component';
import {Observable} from 'rxjs';
import {selectBudgetsData} from '../../state/budgets.state';
import {AsyncPipe} from '@angular/common';
import {BudgetDialogComponent} from '../../components/budgets/budget-dialog/budget-dialog.component';
import {Budget} from '../../../models/features.models';

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
    this.store.dispatch(() => SidebarActions.changePage({page: Page.budgets}));
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
