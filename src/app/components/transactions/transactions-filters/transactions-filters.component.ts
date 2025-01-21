import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {SidebarState} from '../../../state/sidebar.state';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Observable} from 'rxjs';
import {
  selectTransactionsCategories,
  selectTransactionsCategoryFilter,
  selectTransactionsSortBy,
  selectTransactionsSorts
} from '../../../state/transactions.state';
import {Option, Sort} from '../../../../models/models';
import {FormsModule} from '@angular/forms';
import {SelectComponent} from '../../shared/select/select.component';
import {TransactionsActions} from '../../../state/actions/transactions.actions';

@Component({
  selector: 'app-transactions-filters',
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    FormsModule,
    SelectComponent
  ],
  templateUrl: './transactions-filters.component.html',
  styleUrl: './transactions-filters.component.scss'
})
export class TransactionsFiltersComponent {
  private store: Store = inject(Store<{ sidebar: SidebarState }>);
  protected readonly Sort = Sort;

  categories$: Observable<Option[]> = this.store.select(selectTransactionsCategories);
  sortOptions$: Observable<Option[]> = this.store.select(selectTransactionsSorts);
  categorySelected$: Observable<number> = this.store.select(selectTransactionsCategoryFilter);
  sortBy$: Observable<number> = this.store.select(selectTransactionsSortBy);

  searchString: string = '';

  search(sortBy: number) {
    this.store.dispatch(() => TransactionsActions.search({search: this.searchString}));

    this.store.dispatch(() => TransactionsActions.setSortBy({sortBy: sortBy}));
    this.store.dispatch(() => TransactionsActions.setPage({page: 1}));
  }

  updateSort(option: Option) {
    this.store.dispatch(() => TransactionsActions.setSortBy({sortBy: option.id}));

    this.store.dispatch(() => TransactionsActions.setPage({page: 1}));
  }

  updateCategory(option: Option, sortBy: number) {
    this.store.dispatch(() => TransactionsActions.setCategoryFilter({category: option.id}));

    this.store.dispatch(() => TransactionsActions.setSortBy({sortBy: sortBy}));
    this.store.dispatch(() => TransactionsActions.setPage({page: 1}));
  }
}
