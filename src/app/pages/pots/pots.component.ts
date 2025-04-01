import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../state/sidebar.state';
import {SidebarActions} from '../../state/actions/sidebar.actions';
import {Page} from '../../../models/models';
import {PotsCardComponent} from '../../components/pots/pots-card/pots-card.component';
import {Observable} from 'rxjs';
import {Pot} from '../../../models/features.models';
import {selectPotsData} from '../../state/pots.state';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-pots',
  imports: [
    PotsCardComponent,
    AsyncPipe
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss'
})
export class PotsComponent implements OnInit {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);

  pots$: Observable<Pot[]> = this.store.select(selectPotsData);

  ngOnInit(): void {
    this.store.dispatch(() => SidebarActions.changePage({page: Page.pots}));
  }
}
