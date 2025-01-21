import {Component, Input} from '@angular/core';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {BudgetDialogComponent} from '../../delete-confirm-dialog/budget-dialog.component';
import {BudgetAction} from "../../../../../models/models";

@Component({
  selector: 'app-budgets-card-summary',
  imports: [
    NgOptimizedImage,
    NgStyle,
    DialogModule,
    BudgetDialogComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './budgets-card-summary.component.html',
  styleUrl: './budgets-card-summary.component.scss'
})
export class BudgetsCardSummaryComponent {
  protected readonly BudgetAction: typeof BudgetAction = BudgetAction;

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
    this.showDialog = false;
  }

  delete() {
    this.showDialog = false;
  }

  showDeleteDialog() {
    this.showDropdown = false;
    this.showDialog = true;
  }
}
