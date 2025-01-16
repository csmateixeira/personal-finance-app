import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TransactionsActions} from './pages/transactions/state/transactions.actions';
import {Store} from '@ngrx/store';
import {SidebarState} from './sidebar/state/sidebar.state';
import {BudgetsActions} from './pages/budgets/state/budgets.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);


  ngOnInit() {
    this.store.dispatch(() => TransactionsActions.loadTransactions());
    this.store.dispatch(() => BudgetsActions.loadBudgets());
  }
}
