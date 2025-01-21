import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TransactionsActions} from './state/actions/transactions.actions';
import {Store} from '@ngrx/store';
import {SidebarState} from './state/sidebar.state';
import {BudgetsActions} from './state/actions/budgets.actions';

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
