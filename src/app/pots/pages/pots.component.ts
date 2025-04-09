import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../sidebar/state/sidebar.state';
import {SidebarActions} from '../../sidebar/state/sidebar.actions';
import {PotsCardComponent} from '../components/pots-card/pots-card.component';
import {Observable} from 'rxjs';
import {selectPotsData} from '../state/pots.state';
import {AsyncPipe} from '@angular/common';
import {Page} from "../../shared/models/page.model";
import {Pot} from '../models/pot.model';

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
    this.store.dispatch(SidebarActions.changePage({page: Page.pots}));
  }
}
