import {Component, inject} from '@angular/core';
import {SidebarButtonComponent} from './sidebar-button/sidebar-button.component';
import {SidebarLogoComponent} from './sidebar-logo/sidebar-logo.component';
import {SidebarMinimizeComponent} from './sidebar-minimize/sidebar-minimize.component';
import {Store} from '@ngrx/store';
import {selectSidebarExpanded, SidebarState} from './state/sidebar.state';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Page} from '../utils/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    SidebarButtonComponent,
    SidebarLogoComponent,
    SidebarMinimizeComponent,
    AsyncPipe
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  protected readonly Page = Page;
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  expanded$: Observable<boolean> = this.store.select(selectSidebarExpanded);
}
