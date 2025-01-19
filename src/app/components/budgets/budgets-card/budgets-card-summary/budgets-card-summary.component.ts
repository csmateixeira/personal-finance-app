import {Component, inject, Input} from '@angular/core';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {Store} from '@ngrx/store';
import {BudgetsActions} from '../../../../pages/budgets/state/budgets.actions';

@Component({
  selector: 'app-budgets-card-summary',
  imports: [
    NgOptimizedImage,
    NgStyle,
    DialogModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './budgets-card-summary.component.html',
  styleUrl: './budgets-card-summary.component.scss'
})
export class BudgetsCardSummaryComponent {
  private store: Store = inject(Store);

  @Input() theme!: string;
  @Input() category!: string;

  showDropdown = false;
  showDialog = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDialog() {
    this.showDialog = false;
  }

  edit() {
  }

  delete() {
    this.store.dispatch(BudgetsActions.deleteBudget({category: this.category}));
    this.showDialog = false;
  }

  showDeleteDialog() {
    this.showDropdown = false;
    this.showDialog = true;
  }
}
