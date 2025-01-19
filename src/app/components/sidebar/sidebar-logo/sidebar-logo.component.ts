import {Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {Observable} from 'rxjs';
import {selectSidebarExpanded, SidebarState} from '../../../sidebar/state/sidebar.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-sidebar-logo',
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './sidebar-logo.component.html',
  styleUrl: './sidebar-logo.component.scss'
})
export class SidebarLogoComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  expanded$: Observable<boolean> = this.store.select(selectSidebarExpanded);
}
