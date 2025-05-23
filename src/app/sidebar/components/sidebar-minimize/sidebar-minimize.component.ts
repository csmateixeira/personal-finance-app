import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectSidebarExpanded, SidebarState} from '../../state/sidebar.state';
import {Observable} from 'rxjs';
import {SidebarActions} from '../../state/sidebar.actions';

@Component({
  selector: 'app-sidebar-minimize',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './sidebar-minimize.component.html',
  styleUrl: './sidebar-minimize.component.scss'
})
export class SidebarMinimizeComponent {
  private readonly store: Store = inject(Store<{ sidebar: SidebarState }>);

  expanded$: Observable<boolean> = this.store.select(selectSidebarExpanded);

  toggleSidebar() {
    this.store.dispatch(SidebarActions.toggleSidebar());
  }
}
