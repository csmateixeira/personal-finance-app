import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/components/sidebar.component';
import {TransactionsActions} from './transactions/state/transactions.actions';
import {Store} from '@ngrx/store';
import {SidebarState} from './sidebar/state/sidebar.state';
import {BudgetsActions} from './budgets/state/budgets.actions';
import {PotsActions} from './pots/state/pots.actions';
import {OverviewActions} from './overview/state/overview.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store<{ sidebar: SidebarState }>);

  ngOnInit() {
    this.store.dispatch(BudgetsActions.loadBudgets());
    this.store.dispatch(TransactionsActions.loadTransactions());
    this.store.dispatch(PotsActions.loadPots());
    this.store.dispatch(OverviewActions.loadOverviewBalances());
  }
}
