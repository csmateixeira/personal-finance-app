import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Page, Transaction} from '../../../utils/models';
import {map, Observable} from "rxjs";
import {selectTransactionsData, selectTransactionsPage} from "./state/transactions.state";
import {AsyncPipe, DatePipe, NgClass, NgOptimizedImage} from "@angular/common";
import {FormatAmountPipe} from "../../../pipes/format-amount.pipe";
import {PaginatePipe} from '../../pipes/page.pipe';
import {TransactionsActions} from './state/transactions.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    FormatAmountPipe,
    NgClass,
    DatePipe,
    PaginatePipe
  ],
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  transactions$: Observable<Transaction[]> = this.store.select(selectTransactionsData);
  page$: Observable<number> = this.store.select(selectTransactionsPage);
  pages$: Observable<number[]> = this.transactions$
    .pipe(
      map((transactions: Transaction[]) => Math.ceil(transactions.length / 10)),
      map((nPages: number) => Array.from({length: nPages}, (_, i) => (i + 1)))
    );

  headers: string[] = ['Recipient/Sender', 'Category', 'Transaction Date', 'Amount'];

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.transactions}));
  }

  prevPage(page: number | null): void {
    const prevPage = page ? page - 1 : 1;
    this.setPage(prevPage > 0 ? prevPage : 1);
  }

  nextPage(page: number | null, pages?: number): void {
    const nextPage: number = page ? page + 1 : 1;
    const totalPages: number = pages ?? 1;

    this.setPage(nextPage > totalPages ? totalPages : nextPage);
  }

  setPage(page: number): void {
    this.store.dispatch(() => TransactionsActions.setPage({page}));
  }
}
