import {Component, inject, Input} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {Store} from '@ngrx/store';
import {selectSidebarExpanded, SidebarState} from '../state/sidebar.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar-button',
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss'
})
export class SidebarButtonComponent {
  @Input({required: true}) source: string = '';
  @Input({required: true}) text: string = '';

  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  expanded$: Observable<boolean> = this.store.select(selectSidebarExpanded);
}
