import {Component, Input} from '@angular/core';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {BudgetDialogComponent} from '../../budget-dialog/budget-dialog.component';
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

  showDropdown: boolean = false;
  deleteDialog: boolean = false;
  editDialog: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDeleteDialog() {
    this.deleteDialog = false;
  }

  closeEditDialog() {
    this.editDialog = false;
  }

  edit() {
    this.editDialog = false;
  }

  delete() {
    this.deleteDialog = false;
  }

  showDeleteDialog() {
    this.showDropdown = false;
    this.editDialog = false;
    this.deleteDialog = true;
  }

  showEditDialog() {
    this.showDropdown = false;
    this.deleteDialog = false;
    this.editDialog = true;
  }
}
