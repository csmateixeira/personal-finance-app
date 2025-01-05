import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Page, Transaction} from '../../../utils/models';
import {Observable} from "rxjs";
import {selectTransactions} from "./state/transactions.state";
import {AsyncPipe, DatePipe, NgClass, NgOptimizedImage} from "@angular/common";
import {FormatAmountPipe} from "../../../pipes/format-amount.pipe";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    FormatAmountPipe,
    NgClass,
    DatePipe
  ],
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  transactions$: Observable<Transaction[]> = this.store.select(selectTransactions);

  headers: string[] = ['Recipient/Sender', 'Category', 'Transaction Date', 'Amount'];

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.transactions}));
  }
}
