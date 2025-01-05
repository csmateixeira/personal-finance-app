import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {Page} from '../../../utils/models';

@Component({
  selector: 'app-pots',
  imports: [],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss'
})
export class PotsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.pots}));
  }
}
