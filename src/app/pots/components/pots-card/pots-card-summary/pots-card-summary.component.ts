import {Component, Input} from '@angular/core';
import {Pot} from '../../../models/pot.model';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {DialogAction} from '../../../../shared/models/dialog-action.model';
import {PotsDialogComponent} from '../../pots-dialog/pots-dialog.component';

@Component({
  selector: 'app-pots-card-summary',
  imports: [
    NgStyle,
    NgOptimizedImage,
    PotsDialogComponent
  ],
  templateUrl: './pots-card-summary.component.html',
  styleUrl: './pots-card-summary.component.scss'
})
export class PotsCardSummaryComponent {
  protected readonly DialogAction = DialogAction;

  @Input() pot!: Pot;

  showDropdown: boolean = false;
  editDialog: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  showDeleteDialog() {
    this.showDropdown = false;
  }

  showEditDialog() {
    this.showDropdown = false;
    this.editDialog = true;
  }

  closeEditDialog() {
    this.editDialog = false;
  }

  edit() {
    this.editDialog = false;
  }
}
