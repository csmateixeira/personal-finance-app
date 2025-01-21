import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../state/sidebar.state';
import {SidebarActions} from '../../state/actions/sidebar.actions';
import {Page} from '../../../models/models';

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
