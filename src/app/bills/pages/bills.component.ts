import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';

import {Page} from "../../shared/models/page.model";

@Component({
  selector: 'app-bills',
  imports: [],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {
  private readonly store: Store = inject(Store<{ sidebar: SidebarState }>);

  ngOnInit(): void {
    this.store.dispatch(SidebarActions.changePage({page: Page.bills}));
  }
}
