import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {Store} from '@ngrx/store';
import {selectActivePage, selectSidebarExpanded, SidebarState} from '../state/sidebar.state';
import {map, Observable} from 'rxjs';
import {RouterLink} from '@angular/router';
import {Page} from '../../../utils/models';

@Component({
  selector: 'app-sidebar-button',
  imports: [
    AsyncPipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss'
})
export class SidebarButtonComponent {
  @Input({required: true}) linkTo: Page = Page.overview;
  @Input({required: true}) text: string = '';

  protected readonly Page = Page;
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  expanded$: Observable<boolean> = this.store.select(selectSidebarExpanded);
  active$: Observable<boolean> = this.store.select(selectActivePage)
    .pipe(map(page => page === this.linkTo));
}
