import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Budget, Page} from '../../../utils/models';
import {BudgetsSummaryComponent} from './budgets-summary/budgets-summary.component';
import {BudgetsCardComponent} from './budgets-card/budgets-card.component';
import {Observable} from 'rxjs';
import {selectBudgetsData} from './state/budgets.state';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-budgets',
  imports: [
    BudgetsSummaryComponent,
    BudgetsCardComponent,
    AsyncPipe
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})
export class BudgetsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.budgets}));
  }
}
